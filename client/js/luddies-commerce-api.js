/**
 * Sincroniza carrito con MySQL (vía Spring) y crea pedido + pago al confirmar pago simulado.
 * Requiere: LuddiesApi (apiBaseUrl), LuddiesAuth (sesión), LuddiesCatalogCart en páginas de carrito.
 */
(function () {
    "use strict";

    var CART_META_KEY = "luddies.server_cart_meta";
    var SYNC_MS = 500;

    function uses() {
        return window.LuddiesApi && window.LuddiesApi.uses();
    }

    function sessionUserId() {
        var s = window.LuddiesAuth && window.LuddiesAuth.getSession ? window.LuddiesAuth.getSession() : null;
        if (!s || s.userId == null) return null;
        var n = parseInt(String(s.userId), 10);
        return isNaN(n) ? null : n;
    }

    function readMeta() {
        try {
            return JSON.parse(localStorage.getItem(CART_META_KEY) || "{}") || {};
        } catch (e) {
            return {};
        }
    }

    function writeMeta(cartId) {
        try {
            localStorage.setItem(CART_META_KEY, JSON.stringify({ cartId: cartId }));
        } catch (e2) {
        }
    }

    function clearMeta() {
        try {
            localStorage.removeItem(CART_META_KEY);
        } catch (e3) {
        }
    }

    function ensureActiveCartId() {
        var uid = sessionUserId();
        if (!uid) return Promise.reject(new Error("no_session"));
        return window.LuddiesApi.getJson("/api/carts/user/" + uid).then(function (list) {
            var rows = list || [];
            var active = rows.filter(function (c) {
                return c && c.status === "ACTIVE";
            });
            if (active.length) {
                var id = active[0].id;
                writeMeta(id);
                return id;
            }
            return window.LuddiesApi.postJson("/api/carts", { user: { id: uid }, status: "ACTIVE" }).then(function (c) {
                writeMeta(c.id);
                return c.id;
            });
        });
    }

    function syncLocalCartToServer() {
        if (!uses()) return Promise.resolve();
        var uid = sessionUserId();
        if (!uid || !window.LuddiesCatalogCart || !window.LuddiesCatalogCart.readCart) {
            return Promise.resolve();
        }
        return ensureActiveCartId().then(function (cartId) {
            return window.LuddiesApi.delete("/api/cart-items/cart/" + encodeURIComponent(String(cartId))).then(function () {
                var local = window.LuddiesCatalogCart.readCart() || [];
                if (!local.length) return Promise.resolve();
                return Promise.all(
                    local.map(function (li) {
                        var pid = parseInt(String(li.id), 10);
                        if (isNaN(pid)) return Promise.resolve();
                        return window.LuddiesApi.getJson("/api/products/" + encodeURIComponent(String(pid))).then(function (prod) {
                            var price = prod && prod.priceAmount != null ? Number(prod.priceAmount) : 0;
                            return window.LuddiesApi.postJson("/api/cart-items", {
                                cart: { id: cartId },
                                product: { id: pid },
                                quantity: 1,
                                unitPrice: Number(price.toFixed(2))
                            });
                        });
                    })
                );
            });
        });
    }

    var syncTimer;

    function scheduleSyncCart() {
        if (!uses()) return;
        clearTimeout(syncTimer);
        syncTimer = setTimeout(function () {
            if (!sessionUserId()) return;
            syncLocalCartToServer().catch(function (err) {
                if (window.console && console.warn) console.warn("[LuddiesCommerce] sync cart:", err);
            });
        }, SYNC_MS);
    }

    function markCartConverted() {
        var cid = readMeta().cartId;
        if (!cid) return Promise.resolve();
        return window.LuddiesApi
            .getJson("/api/carts/" + encodeURIComponent(String(cid)))
            .then(function (cart) {
                if (!cart) return null;
                cart.status = "CONVERTED";
                return window.LuddiesApi.putJson("/api/carts/" + encodeURIComponent(String(cid)), cart);
            })
            .then(function () {
                clearMeta();
            });
    }

    /**
     * @param {object} opts
     * @param {Array<{id:string}>} opts.items
     * @param {number} opts.total
     * @param {string} opts.reference
     * @param {string} [opts.cardLast4]
     * @param {string} [opts.email]
     * @param {string} [opts.name]
     */
    function submitPaidOrder(opts) {
        if (!uses()) return Promise.reject(new Error("api_off"));
        var uid = sessionUserId();
        if (!uid) return Promise.reject(new Error("no_session"));
        var items = (opts && opts.items) || [];
        var total = opts && opts.total != null ? Number(opts.total) : 0;
        var reference = (opts && opts.reference) || "";
        if (!items.length || total <= 0 || !reference) {
            return Promise.reject(new Error("invalid_payload"));
        }

        return Promise.all(
            items.map(function (li) {
                var pid = parseInt(String(li.id), 10);
                return window.LuddiesApi.getJson("/api/products/" + encodeURIComponent(String(pid))).then(function (prod) {
                    return { li: li, prod: prod, pid: pid };
                });
            })
        ).then(function (pairs) {
            var lines = [];
            var calc = 0;
            for (var i = 0; i < pairs.length; i++) {
                var row = pairs[i];
                var prod = row.prod;
                var pid = row.pid;
                if (isNaN(pid)) continue;
                var unit = prod && prod.priceAmount != null ? Number(prod.priceAmount) : 0;
                var qty = 1;
                var title =
                    prod && prod.titleEs
                        ? prod.titleEs
                        : prod && prod.titleEn
                          ? prod.titleEn
                          : "Product " + pid;
                var lineTot = unit * qty;
                calc += lineTot;
                lines.push({ pid: pid, title: title, unit: unit, qty: qty, line: lineTot });
            }
            var orderNo =
                "ORD-" +
                Date.now() +
                "-" +
                Math.random()
                    .toString(36)
                    .substring(2, 8)
                    .toUpperCase();
            var totalFixed = Number(total.toFixed(2));
            var subFixed = Number(calc.toFixed(2));
            return window.LuddiesApi
                .postJson("/api/orders", {
                    orderNumber: orderNo,
                    user: { id: uid },
                    guestEmail: (opts && opts.email) || undefined,
                    guestName: (opts && opts.name) || undefined,
                    subtotal: subFixed,
                    total: totalFixed,
                    currency: "MXN",
                    status: "PAID",
                    locale: "es"
                })
                .then(function (order) {
                    var oid = order.id;
                    return Promise.all(
                        lines.map(function (L) {
                            return window.LuddiesApi.postJson("/api/order-items", {
                                order: { id: oid },
                                product: { id: L.pid },
                                productTitle: L.title,
                                unitPrice: Number(L.unit.toFixed(2)),
                                quantity: L.qty,
                                lineTotal: Number(L.line.toFixed(2))
                            });
                        })
                    ).then(function () {
                        return window.LuddiesApi
                            .postJson("/api/payments", {
                                order: { id: oid },
                                reference: reference,
                                method: "CARD",
                                cardLast4: (opts && opts.cardLast4) || null,
                                cardBrand: "SIMULATED",
                                amount: totalFixed,
                                currency: "MXN",
                                status: "COMPLETED",
                                paidAt: new Date().toISOString()
                            })
                            .then(function (payment) {
                                return markCartConverted().then(function () {
                                    return { order: order, payment: payment };
                                });
                            });
                    });
                });
        });
    }

    window.LuddiesCommerce = {
        scheduleSyncCart: scheduleSyncCart,
        syncLocalCartToServer: syncLocalCartToServer,
        submitPaidOrder: submitPaidOrder,
        markCartConverted: markCartConverted
    };
})();

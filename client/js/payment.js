(function () {
    "use strict";

    var STUB_KEY    = "luddies.payment_stub";
    var CART_KEY    = "luddies.catalog_cart";
    var RECEIPT_KEY = "luddies.payment_receipt";

    var _cfg               = (window.LuddiesConfig && window.LuddiesConfig.emailjs) || {};
    var EMAILJS_PUBLIC_KEY = _cfg.publicKeyPayment  || "";
    var EMAILJS_SERVICE_ID = _cfg.serviceIdPayment  || "";
    var EMAILJS_TEMPLATE_ID= _cfg.templateIdPayment || "";

    function t(key) {
        return window.LuddiesI18n && window.LuddiesI18n.t ? window.LuddiesI18n.t(key) : key;
    }

    function readCart() {
        try {
            if (window.LuddiesCatalogCart && window.LuddiesCatalogCart.readCart) {
                return window.LuddiesCatalogCart.readCart();
            }
            var raw = localStorage.getItem(CART_KEY);
            var data = raw ? JSON.parse(raw) : [];
            return Array.isArray(data) ? data : [];
        } catch (e) {
            return [];
        }
    }

    function parseMXNAmountFromPriceText(priceText) {
        if (!priceText || typeof priceText !== "string") return NaN;
        var m = priceText.match(/\$\s*([\d,.]+)/);
        if (!m) return NaN;
        var raw = m[1].replace(/,/g, "");
        var n = parseFloat(raw);
        return isFinite(n) ? n : NaN;
    }

    function formatMXNTotal(amount) {
        var lang = window.LuddiesI18n && window.LuddiesI18n.getLang ? window.LuddiesI18n.getLang() : "es";
        try {
            return (
                "$" +
                amount.toLocaleString(lang === "en" ? "en-US" : "es-MX", {
                    maximumFractionDigits: 0,
                }) +
                " MXN"
            );
        } catch (e) {
            return "$" + Math.round(amount) + " MXN";
        }
    }

    function computeCartSummary(items) {
        var total = 0;
        var validItems = 0;
        items.forEach(function (item) {
            var txt = item && item.priceKey ? t(item.priceKey) : "";
            var n = parseMXNAmountFromPriceText(txt);
            if (!isNaN(n)) {
                total += n;
                validItems += 1;
            }
        });
        return {
            itemCount: items.length,
            validItems: validItems,
            total: total,
            isValid: items.length > 0 && validItems === items.length && total > 0,
        };
    }

    function makeReference() {
        var stamp = Date.now().toString(36).toUpperCase();
        var rand  = Math.random().toString(36).substring(2, 8).toUpperCase();
        return "LUD-" + stamp + "-" + rand;
    }

    function showBanner(el, message) {
        if (!el) return;
        el.textContent = message;
        el.hidden = false;
    }

    function hideBanner(el) {
        if (!el) return;
        el.hidden = true;
        el.textContent = "";
    }

    function validateCheckoutReadiness(summary, email) {
        if (!summary.itemCount)  return t("payment_error_empty_cart");
        if (!summary.isValid)    return t("payment_error_invalid_total");
        if (!email)              return t("payment_error_missing_email");
        return "";
    }

    function setSubmitState(button, disabled, loading) {
        if (!button) return;
        button.disabled = !!disabled;
        button.classList.toggle("loading", !!loading);
        button.setAttribute("aria-busy", loading ? "true" : "false");
    }

    function clearCart() {
        if (window.LuddiesCatalogCart && window.LuddiesCatalogCart.clearCart) {
            window.LuddiesCatalogCart.clearCart();
            return;
        }
        try {
            localStorage.setItem(CART_KEY, JSON.stringify([]));
        } catch (e) { /* ignore */ }
    }

    function countLabel(itemCount) {
        var template = t("payment_items_count");
        if (!template || template === "payment_items_count") return itemCount + " items";
        if (template.indexOf("{n}") >= 0) return template.replace(/\{n\}/g, String(itemCount));
        return itemCount + " " + template;
    }

    function isValidLuhn(val) {
        var sum = 0;
        var shouldDouble = false;
        for (var i = val.length - 1; i >= 0; i--) {
            var digit = parseInt(val.charAt(i), 10);
            if (shouldDouble) { if ((digit *= 2) > 9) digit -= 9; }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return (sum % 10) === 0;
    }

    function isValidExpiry(val) {
        var parts = val.split("/");
        if (parts.length !== 2) return false;
        var month = parseInt(parts[0], 10);
        var year  = parseInt(parts[1], 10);
        if (month < 1 || month > 12) return false;
        var now          = new Date();
        var currentYear  = parseInt(now.getFullYear().toString().substring(2, 4), 10);
        var currentMonth = now.getMonth() + 1;
        if (year < currentYear) return false;
        if (year === currentYear && month < currentMonth) return false;
        return true;
    }
    function initEmailJS() {
        if (!window.emailjs) return;
        try {
            window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        } catch (e) {
            try { window.emailjs.init(EMAILJS_PUBLIC_KEY); } catch (_) {}
        }
    }

    function sendOrderConfirmation(orderData) {
        if (!window.emailjs || typeof window.emailjs.send !== "function" || !EMAILJS_SERVICE_ID) {
            console.warn("[payment] EmailJS no disponible o faltan claves, se omite el envío.");
            return;
        }

        var templateParams = {
            to_email:    orderData.email,
            to_name:     orderData.name  || "Comprador",
            order_ref:   orderData.ref,
            order_total: orderData.total,
            order_items: orderData.items,
            order_date:  orderData.date
        };

        window.emailjs
            .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function () {
                console.log("[payment] EmailJS: confirmación enviada a " + orderData.email);
            })
            .catch(function (err) {
                console.error("[payment] EmailJS error:", err);
            });
    }

    document.addEventListener("DOMContentLoaded", function () {

        initEmailJS();

        var elEmail     = document.getElementById("payment-stub-email");
        var elTotal     = document.getElementById("payment-total");
        var form        = document.getElementById("payment-simulation-form");
        var viewCheckout = document.getElementById("payment-checkout-view");
        var viewSuccess  = document.getElementById("payment-success-view");
        var btnPay       = document.getElementById("btn-simulate-pay");
        var errorBanner  = document.getElementById("payment-error-banner");
        var cartCountEl  = document.getElementById("payment-cart-count");
        var referenceEl  = document.getElementById("payment-confirmation-ref");

        var ccInput  = document.getElementById("cc-number");
        var expInput = document.getElementById("cc-exp");
        var cvcInput = document.getElementById("cc-cvc");

        var checkoutData   = null;
        var cartSummary    = null;
        var paymentReference = "";

        function renderEmail() {
            if (!elEmail) return;
            elEmail.textContent = (checkoutData && checkoutData.email)
                ? checkoutData.email
                : t("payment_email_missing");
        }

        function readStoredReference() {
            try {
                var rawReceipt = sessionStorage.getItem(RECEIPT_KEY);
                if (!rawReceipt) return "";
                var receipt = JSON.parse(rawReceipt);
                return receipt && receipt.reference ? String(receipt.reference) : "";
            } catch (e) {
                return "";
            }
        }

        function renderReference() {
            if (!referenceEl || viewSuccess.hidden) return;
            if (!paymentReference) paymentReference = readStoredReference();
            referenceEl.textContent = paymentReference
                ? t("payment_reference_prefix") + " " + paymentReference
                : t("payment_reference_prefix") + " --";
        }

        function renderTotal() {
            var items = readCart();
            cartSummary = computeCartSummary(items);
            if (elTotal && cartSummary) {
                elTotal.textContent = cartSummary.isValid ? formatMXNTotal(cartSummary.total) : "$0 MXN";
            }
            if (cartCountEl && cartSummary) {
                cartCountEl.textContent = countLabel(cartSummary.itemCount);
            }
        }

        try {
            var rawStub = sessionStorage.getItem(STUB_KEY);
            if (rawStub) {
                var d = JSON.parse(rawStub);
                if (d && d.email) checkoutData = d;
            }
        } catch (e) {  }

        renderEmail();

        renderTotal();

        var readinessError = validateCheckoutReadiness(
            cartSummary || { itemCount: 0, isValid: false },
            checkoutData && checkoutData.email
        );
        if (readinessError) {
            showBanner(errorBanner, readinessError);
            setSubmitState(btnPay, true, false);
        } else {
            hideBanner(errorBanner);
            setSubmitState(btnPay, false, false);
        }

        document.addEventListener("luddies:catalog-cart-changed", function () {
            renderTotal();
            var msg = validateCheckoutReadiness(
                cartSummary || { itemCount: 0, isValid: false },
                checkoutData && checkoutData.email
            );
            if (msg) {
                showBanner(errorBanner, msg);
                setSubmitState(btnPay, true, false);
            } else {
                hideBanner(errorBanner);
                setSubmitState(btnPay, false, false);
            }
        });

        if (ccInput && expInput && cvcInput) {
            ccInput.addEventListener("input", function (e) {
                var value = e.target.value.replace(/\D/g, "");
                var formatted = "";
                for (var i = 0; i < value.length; i++) {
                    if (i > 0 && i % 4 === 0) formatted += " ";
                    formatted += value[i];
                }
                e.target.value = formatted;
                ccInput.setCustomValidity("");
            });

            expInput.addEventListener("input", function (e) {
                var value = e.target.value.replace(/\D/g, "");
                e.target.value = value.length > 2
                    ? value.substring(0, 2) + "/" + value.substring(2, 4)
                    : value;
                expInput.setCustomValidity("");
            });

            cvcInput.addEventListener("input", function (e) {
                e.target.value = e.target.value.replace(/\D/g, "").substring(0, 4);
                cvcInput.setCustomValidity("");
            });
        }

        if (form) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                hideBanner(errorBanner);

                renderTotal();
                var guardedError = validateCheckoutReadiness(
                    cartSummary || { itemCount: 0, isValid: false },
                    checkoutData && checkoutData.email
                );
                if (guardedError) {
                    showBanner(errorBanner, guardedError);
                    return;
                }

                if (ccInput && expInput && cvcInput) {
                    var ccVal = ccInput.value.replace(/\s/g, "");
                    if (ccVal.length < 13 || !isValidLuhn(ccVal)) {
                        ccInput.setCustomValidity(t("payment_error_card_invalid"));
                        ccInput.reportValidity();
                        return;
                    }
                    if (!isValidExpiry(expInput.value)) {
                        expInput.setCustomValidity(t("payment_error_exp_invalid"));
                        expInput.reportValidity();
                        return;
                    }
                    if (cvcInput.value.length < 3) {
                        cvcInput.setCustomValidity(t("payment_error_cvc_invalid"));
                        cvcInput.reportValidity();
                        return;
                    }
                }

                setSubmitState(btnPay, true, true);

                var itemsSnapshot = readCart();
                var productNames  = itemsSnapshot.map(function (item) {
                    return item.titleKey
                        ? t(item.titleKey)
                        : (item.name ? t(item.name) : "Producto");
                }).join(", ") || "Sin productos";

                var ccDigits = ccInput && ccInput.value ? ccInput.value.replace(/\s/g, "") : "";

                function completePurchaseUi(reference) {
                    setSubmitState(btnPay, false, false);
                    if (viewCheckout) viewCheckout.hidden = true;
                    if (viewSuccess) viewSuccess.hidden = false;
                    paymentReference = reference;
                    try {
                        sessionStorage.setItem(
                            RECEIPT_KEY,
                            JSON.stringify({
                                reference: reference,
                                total: cartSummary ? cartSummary.total : 0,
                                email: checkoutData ? checkoutData.email : "",
                                name: checkoutData ? checkoutData.name : "",
                                at: Date.now()
                            })
                        );
                    } catch (e) {
                        /* ignore */
                    }
                    renderReference();
                    sendOrderConfirmation({
                        email: checkoutData ? checkoutData.email : "",
                        name: checkoutData ? checkoutData.name : "",
                        ref: reference,
                        total: cartSummary ? formatMXNTotal(cartSummary.total) : "$0 MXN",
                        items: productNames,
                        date: new Date().toLocaleDateString("es-MX", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })
                    });
                    clearCart();
                }

                setTimeout(function () {
                    var reference = makeReference();
                    var useApi =
                        window.LuddiesApi && window.LuddiesApi.uses && window.LuddiesApi.uses();
                    var sess =
                        window.LuddiesAuth && window.LuddiesAuth.getSession && window.LuddiesAuth.getSession();
                    var canPersist =
                        useApi &&
                        sess &&
                        window.LuddiesCommerce &&
                        window.LuddiesCommerce.submitPaidOrder;

                    if (canPersist) {
                        window.LuddiesCommerce
                            .submitPaidOrder({
                                email: checkoutData ? checkoutData.email : "",
                                name: checkoutData ? checkoutData.name : "",
                                items: itemsSnapshot,
                                total: cartSummary ? cartSummary.total : 0,
                                reference: reference,
                                cardLast4: ccDigits.length >= 4 ? ccDigits.slice(-4) : ""
                            })
                            .then(function () {
                                completePurchaseUi(reference);
                            })
                            .catch(function (err) {
                                setSubmitState(btnPay, false, false);
                                if (viewCheckout) viewCheckout.hidden = false;
                                if (viewSuccess) viewSuccess.hidden = true;
                                if (window.console && console.error) console.error(err);
                                showBanner(errorBanner, t("payment_error_server"));
                            });
                        return;
                    }

                    completePurchaseUi(reference);
                }, 2000);
            });
        }
    });
})();

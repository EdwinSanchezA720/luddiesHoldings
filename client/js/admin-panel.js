/**
 * Admin UI: product CRUD and user list (delete user for admin role only).
 */
(function () {
    "use strict";

    var pendingDeleteProductId = null;
    var pendingDeleteUserId = null;

    var CANONICAL_CATEGORIES = [
        "science",
        "technology",
        "engineering",
        "mathematics",
        "neurodiversity",
        "certification",
        "physical",
        "dissidents"
    ];

    function t(key) {
        return window.LuddiesI18n && window.LuddiesI18n.t ? window.LuddiesI18n.t(key) : key;
    }

    function tr(es, en) {
        if (window.LuddiesI18n && window.LuddiesI18n.getLang() === "en") return en;
        return es;
    }

    function showError(msgKey) {
        var el = document.getElementById("admin-form-error");
        if (el) {
            el.textContent = t(msgKey);
            el.classList.remove("d-none");
        }
    }

    function showPageError(msgKey) {
        var el = document.getElementById("admin-page-error");
        if (el) {
            el.textContent = t(msgKey);
            el.classList.remove("d-none");
        }
    }

    function hideError() {
        var el = document.getElementById("admin-form-error");
        if (el) el.classList.add("d-none");
    }

    function getTranslationsDict(lang) {
        if (!window.LuddiesI18n || !window.LuddiesI18n.translations) return {};
        return window.LuddiesI18n.translations[lang] || {};
    }

    function setCategoryFieldsFromString(cat) {
        var c = (cat || "").toLowerCase().trim();
        var tokens = c.split(/\s+/).filter(Boolean);
        var preset = document.getElementById("product-category-preset");
        var custom = document.getElementById("product-category-custom");
        var wrap = document.getElementById("product-category-custom-wrap");
        if (!preset || !custom || !wrap) return;
        if (tokens.length === 1 && CANONICAL_CATEGORIES.indexOf(tokens[0]) !== -1) {
            preset.value = tokens[0];
            wrap.classList.add("d-none");
            custom.value = "";
        } else {
            preset.value = "__other__";
            wrap.classList.remove("d-none");
            custom.value = c;
        }
    }

    function prefillFormFromProduct(p) {
        document.getElementById("product-id").value = p.id || "";
        document.getElementById("product-img").value = p.img || "";
        setCategoryFieldsFromString(p.category || "");
        var purch = p.purchasable !== 0 && p.purchasable !== "0";
        document.getElementById("product-purchasable").value = purch ? "1" : "0";

        if (p.custom && p.labels && p.labels.es && p.labels.en) {
            document.getElementById("product-name-es").value = p.labels.es.name || "";
            document.getElementById("product-name-en").value = p.labels.en.name || "";
            document.getElementById("product-desc-es").value = p.labels.es.description || "";
            document.getElementById("product-desc-en").value = p.labels.en.description || "";
            document.getElementById("product-meta-es").value = p.labels.es.meta || "";
            document.getElementById("product-meta-en").value = p.labels.en.meta || "";
            document.getElementById("product-price-es").value = p.labels.es.price || "";
            document.getElementById("product-price-en").value = p.labels.en.price || "";
        } else {
            var dEs = getTranslationsDict("es");
            var dEn = getTranslationsDict("en");
            document.getElementById("product-name-es").value = dEs[p.name] != null ? dEs[p.name] : "";
            document.getElementById("product-name-en").value = dEn[p.name] != null ? dEn[p.name] : "";
            document.getElementById("product-desc-es").value = dEs[p.description] != null ? dEs[p.description] : "";
            document.getElementById("product-desc-en").value = dEn[p.description] != null ? dEn[p.description] : "";
            document.getElementById("product-meta-es").value = dEs[p.meta] != null ? dEs[p.meta] : "";
            document.getElementById("product-meta-en").value = dEn[p.meta] != null ? dEn[p.meta] : "";
            document.getElementById("product-price-es").value = dEs[p.price] != null ? dEs[p.price] : "";
            document.getElementById("product-price-en").value = dEn[p.price] != null ? dEn[p.price] : "";
        }
    }

    function readCategoryFromForm() {
        var preset = document.getElementById("product-category-preset");
        var v = preset ? preset.value : "";
        if (v === "__other__") {
            var custom = (document.getElementById("product-category-custom") && document.getElementById("product-category-custom").value) || "";
            return custom
                .toLowerCase()
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .join(" ");
        }
        if (v) return v.toLowerCase().trim();
        return "";
    }

    function readForm() {
        return {
            id: document.getElementById("product-id").value.trim(),
            img: document.getElementById("product-img").value.trim(),
            category: readCategoryFromForm() || "science",
            purchasable: document.getElementById("product-purchasable").value === "0" ? 0 : 1,
            labels: {
                es: {
                    name: document.getElementById("product-name-es").value.trim(),
                    description: document.getElementById("product-desc-es").value.trim(),
                    meta: document.getElementById("product-meta-es").value.trim(),
                    price: document.getElementById("product-price-es").value.trim()
                },
                en: {
                    name: document.getElementById("product-name-en").value.trim(),
                    description: document.getElementById("product-desc-en").value.trim(),
                    meta: document.getElementById("product-meta-en").value.trim(),
                    price: document.getElementById("product-price-en").value.trim()
                }
            }
        };
    }

    function validateForm(data) {
        if (!data.img) return false;
        try {
            // eslint-disable-next-line no-new
            new URL(data.img);
        } catch (e) {
            return false;
        }
        var preset = document.getElementById("product-category-preset");
        if (!preset || !preset.value) return false;
        if (preset.value === "__other__") {
            if (!readCategoryFromForm()) return false;
        }
        if (!data.labels.es.name || !data.labels.en.name) return false;
        if (!data.labels.es.description || !data.labels.en.description) return false;
        return true;
    }

    function displayName(p) {
        if (p.custom && p.labels) {
            return tr(p.labels.es.name, p.labels.en.name);
        }
        var d = getTranslationsDict(window.LuddiesI18n.getLang() || "es");
        return d[p.name] != null ? d[p.name] : p.name;
    }

    function renderProductTable() {
        var body = document.getElementById("admin-products-tbody");
        if (!body || !window.LuddiesAuth) return;
        var products = window.LuddiesAuth.getProducts();
        body.innerHTML = "";
        products.forEach(function (p) {
            var trEl = document.createElement("tr");
            trEl.innerHTML =
                "<td>" +
                escapeHtml(p.id) +
                "</td><td>" +
                escapeHtml(displayName(p)) +
                "</td><td>" +
                escapeHtml(p.category || "") +
                "</td><td class=\"text-nowrap\">" +
                "<button type=\"button\" class=\"btn btn-sm btn-luddies btn-luddies--outline me-1 js-admin-edit\" data-id=\"" +
                escapeAttr(p.id) +
                "\">" +
                t("admin_btn_edit") +
                "</button>" +
                "<button type=\"button\" class=\"btn btn-sm btn-luddies btn-luddies--secondary js-admin-del-product\" data-id=\"" +
                escapeAttr(p.id) +
                "\">" +
                t("admin_btn_delete") +
                "</button></td>";
            body.appendChild(trEl);
        });
    }

    function renderUserTable() {
        var body = document.getElementById("admin-users-tbody");
        if (!body || !window.LuddiesAuth) return;
        var users = window.LuddiesAuth.getUsers();
        body.innerHTML = "";
        users.forEach(function (u) {
            var trEl = document.createElement("tr");
            var roleLabel = u.role === "admin" ? t("admin_role_admin") : t("admin_role_user");
            var delBtn =
                u.role === "user"
                    ? "<button type=\"button\" class=\"btn btn-sm btn-luddies btn-luddies--secondary js-admin-del-user\" data-id=\"" +
                      escapeAttr(u.id) +
                      "\">" +
                      t("admin_user_delete") +
                      "</button>"
                    : "—";
            trEl.innerHTML =
                "<td>" +
                escapeHtml(u.fullName || "") +
                "</td><td>" +
                escapeHtml(u.email) +
                "</td><td>" +
                escapeHtml(roleLabel) +
                "</td><td class=\"text-nowrap\">" +
                delBtn +
                "</td>";
            body.appendChild(trEl);
        });
    }

    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function escapeAttr(s) {
        return String(s).replace(/"/g, "&quot;");
    }

    function openProductModal(product) {
        var modalEl = document.getElementById("product-form-modal");
        if (!modalEl) return;
        if (product) {
            prefillFormFromProduct(product);
        } else {
            document.getElementById("product-id").value = "";
            document.getElementById("product-img").value = "";
            var pSel = document.getElementById("product-category-preset");
            if (pSel) pSel.value = "";
            var cIn = document.getElementById("product-category-custom");
            if (cIn) cIn.value = "";
            var cWrap = document.getElementById("product-category-custom-wrap");
            if (cWrap) cWrap.classList.add("d-none");
            document.getElementById("product-purchasable").value = "1";
            document.getElementById("product-name-es").value = "";
            document.getElementById("product-name-en").value = "";
            document.getElementById("product-desc-es").value = "";
            document.getElementById("product-desc-en").value = "";
            document.getElementById("product-meta-es").value = "";
            document.getElementById("product-meta-en").value = "";
            document.getElementById("product-price-es").value = "";
            document.getElementById("product-price-en").value = "";
        }
        hideError();
        if (window.LuddiesI18n && window.LuddiesI18n.applyTranslations) {
            window.LuddiesI18n.applyTranslations(window.LuddiesI18n.getLang());
        }
        if (window.bootstrap && window.bootstrap.Modal) {
            window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
        }
    }

    function findProductById(id) {
        return window.LuddiesAuth.getProducts().find(function (p) {
            return String(p.id) === String(id);
        });
    }

    function saveProductForm(e) {
        e.preventDefault();
        hideError();
        var data = readForm();
        if (!validateForm(data)) {
            showError("admin_error_validation");
            return;
        }
        var asJson = JSON.stringify({
            id: data.id || null,
            img: data.img,
            category: data.category,
            purchasable: data.purchasable,
            labels: data.labels
        });
        if (window.console && console.debug) {
            console.debug("Product model (JSON string):", asJson);
        }
        var res = window.LuddiesAuth.saveProduct(data);
        if (res && res.ok) {
            if (window.LuddiesAuth.syncProductLabelsToI18n) {
                window.LuddiesAuth.syncProductLabelsToI18n();
            }
            var modalEl = document.getElementById("product-form-modal");
            if (modalEl && window.bootstrap) {
                var inst = window.bootstrap.Modal.getInstance(modalEl);
                if (inst) inst.hide();
            }
            renderProductTable();
        } else {
            showError("admin_error_validation");
        }
    }

    function init() {
        renderProductTable();
        renderUserTable();

        document.getElementById("admin-btn-new-product") &&
            document.getElementById("admin-btn-new-product").addEventListener("click", function () {
                openProductModal(null);
            });

        document.getElementById("admin-products-tbody") &&
            document.getElementById("admin-products-tbody").addEventListener("click", function (e) {
                var ed = e.target.closest(".js-admin-edit");
                if (ed) {
                    var p = findProductById(ed.getAttribute("data-id"));
                    if (p) openProductModal(p);
                    return;
                }
                var del = e.target.closest(".js-admin-del-product");
                if (del) {
                    pendingDeleteProductId = del.getAttribute("data-id");
                    var cfm = document.getElementById("confirm-delete-product-modal");
                    if (cfm && window.bootstrap) {
                        new window.bootstrap.Modal(cfm).show();
                    }
                }
            });

        document.getElementById("admin-users-tbody") &&
            document.getElementById("admin-users-tbody").addEventListener("click", function (e) {
                var del = e.target.closest(".js-admin-del-user");
                if (del) {
                    pendingDeleteUserId = del.getAttribute("data-id");
                    var cfm = document.getElementById("confirm-delete-user-modal");
                    if (cfm && window.bootstrap) {
                        new window.bootstrap.Modal(cfm).show();
                    }
                }
            });

        var catPreset = document.getElementById("product-category-preset");
        if (catPreset) {
            catPreset.addEventListener("change", function () {
                var wrap = document.getElementById("product-category-custom-wrap");
                if (!wrap) return;
                if (catPreset.value === "__other__") {
                    wrap.classList.remove("d-none");
                } else {
                    wrap.classList.add("d-none");
                }
            });
        }

        document.getElementById("product-form") &&
            document.getElementById("product-form").addEventListener("submit", saveProductForm);

        document.getElementById("confirm-delete-product-ok") &&
            document.getElementById("confirm-delete-product-ok").addEventListener("click", function () {
                if (pendingDeleteProductId) {
                    window.LuddiesAuth.deleteProduct(pendingDeleteProductId);
                    pendingDeleteProductId = null;
                    var m = document.getElementById("confirm-delete-product-modal");
                    if (m && window.bootstrap) {
                        var i = window.bootstrap.Modal.getInstance(m);
                        if (i) i.hide();
                    }
                    renderProductTable();
                }
            });

        document.getElementById("confirm-delete-user-ok") &&
            document.getElementById("confirm-delete-user-ok").addEventListener("click", function () {
                if (!pendingDeleteUserId) return;
                var s = window.LuddiesAuth.getSession();
                var r = window.LuddiesAuth.deleteUser(pendingDeleteUserId, s && s.userId);
                pendingDeleteUserId = null;
                var m = document.getElementById("confirm-delete-user-modal");
                if (m && window.bootstrap) {
                    var i = window.bootstrap.Modal.getInstance(m);
                    if (i) i.hide();
                }
                if (r && r.ok) {
                    renderUserTable();
                } else if (r && r.error === "forbidden") {
                    showPageError("admin_error_forbidden");
                }
            });
    }

    document.addEventListener("DOMContentLoaded", init);
})();

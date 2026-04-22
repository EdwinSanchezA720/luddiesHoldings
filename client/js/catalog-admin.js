 (function () {
        "use strict";

        var STORAGE_KEY = "luddies.custom_products";

        /* ── Storage ── */
        function readProducts() {
            try {
                var raw = localStorage.getItem(STORAGE_KEY);
                var data = raw ? JSON.parse(raw) : [];
                return Array.isArray(data) ? data : [];
            } catch (e) { return []; }
        }

        function writeProducts(arr) {
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); } catch (e) {}
        }

        function generateId() {
            return "custom_" + Date.now() + "_" + Math.floor(Math.random() * 9999);
        }

        /* ── Toast ── */
        var toastTimer;
        function showToast(msg, isError) {
            var t   = document.getElementById("admin-toast");
            var msg_el = document.getElementById("admin-toast-msg");
            var icon   = t.querySelector(".admin-toast__icon i");
            clearTimeout(toastTimer);
            msg_el.textContent = msg;
            t.classList.toggle("is-error", !!isError);
            if (icon) {
                icon.className = isError
                    ? "fa-solid fa-circle-exclamation"
                    : "fa-solid fa-circle-check";
            }
            t.classList.add("show");
            toastTimer = setTimeout(function () { t.classList.remove("show"); }, 3200);
        }

        /* ── Helpers ── */
        function getSelectedCats() {
            return Array.from(
                document.querySelectorAll("#cat-grid input:checked")
            ).map(function (c) { return c.value; });
        }

        function escHtml(str) {
            return String(str || "")
                .replace(/&/g, "&amp;").replace(/</g, "&lt;")
                .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        }

        /* ── Live preview ── */
        function updatePreview() {
            var title = document.getElementById("f-title").value || "Título del producto";
            var meta  = document.getElementById("f-meta").value  || "Etiqueta · Categoría";
            var desc  = document.getElementById("f-desc").value  || "La descripción aparecerá aquí...";
            var price = document.getElementById("f-price").value || "—";
            var cats  = getSelectedCats();

            document.getElementById("prev-title").textContent = title;
            document.getElementById("prev-meta").textContent  = meta;
            document.getElementById("prev-desc").textContent  = desc;
            document.getElementById("prev-price").textContent = price;

            var catsEl = document.getElementById("prev-cats");
            catsEl.innerHTML = "";
            cats.forEach(function (c) {
                var tag = document.createElement("span");
                tag.className = "preview-card__cat-tag";
                tag.textContent = c;
                catsEl.appendChild(tag);
            });
        }

        /* ── Image preview ── */
        var imgTimer;
        document.getElementById("f-img").addEventListener("input", function () {
            clearTimeout(imgTimer);
            var url = this.value.trim();
            imgTimer = setTimeout(function () {
                var strip   = document.getElementById("img-preview-strip");
                var imgEl   = document.getElementById("img-preview-img");
                var prevImg = document.getElementById("prev-img");

                if (!url) {
                    strip.classList.remove("has-img");
                    imgEl.classList.remove("visible");
                    imgEl.src = "";
                    prevImg.className = "preview-card__img";
                    prevImg.innerHTML = '<i class="fa-regular fa-image"></i>';
                    prevImg.style.backgroundImage = "";
                    return;
                }

                var test = new Image();
                test.onload = function () {
                    strip.classList.add("has-img");
                    imgEl.src = url;
                    imgEl.classList.add("visible");

                    prevImg.innerHTML = "";
                    prevImg.className = "preview-card__img loaded";
                    prevImg.style.cssText = "background-image:url(" + url + ");background-size:cover;background-position:center;display:block;";
                };
                test.onerror = function () {
                    strip.classList.remove("has-img");
                    imgEl.classList.remove("visible");
                };
                test.src = url;
            }, 600);
        });

        /* ── Category chips ── */
        document.getElementById("cat-grid").addEventListener("click", function (e) {
            var chip = e.target.closest(".cat-chip");
            if (!chip) return;
            var cb = chip.querySelector("input[type='checkbox']");
            cb.checked = !cb.checked;
            chip.classList.toggle("checked", cb.checked);
            updatePreview();
        });

        /* ── Live input events ── */
        ["f-title", "f-meta", "f-desc", "f-price"].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.addEventListener("input", updatePreview);
        });

        /* ── Render saved list ── */
        function renderList() {
            var list    = document.getElementById("products-list");
            var counter = document.getElementById("saved-count");
            var products = readProducts();

            counter.textContent = products.length;

            if (products.length === 0) {
                list.innerHTML =
                    '<div class="empty-state">' +
                    '<i class="fa-solid fa-box-open"></i>' +
                    'Aún no has guardado ningún producto.</div>';
                return;
            }

            list.innerHTML = "";
            products.slice().reverse().forEach(function (p) {
                var item = document.createElement("div");
                item.className = "product-item";
                item.innerHTML =
                    '<img class="product-item__img" src="' + escHtml(p.img) +
                    '" onerror="this.style.opacity=\'0.2\'" alt="">' +
                    '<div class="product-item__info">' +
                        '<div class="product-item__title">' + escHtml(p.title) + '</div>' +
                        '<div class="product-item__meta">' + escHtml(p.category) + '</div>' +
                    '</div>' +
                    '<button class="product-item__del" data-del-id="' + escHtml(p.id) +
                    '" title="Eliminar producto" aria-label="Eliminar ' + escHtml(p.title) + '">' +
                    '<i class="fa-solid fa-trash-can"></i></button>';
                list.appendChild(item);
            });
        }

        /* ── Delete ── */
        document.getElementById("products-list").addEventListener("click", function (e) {
            var btn = e.target.closest("[data-del-id]");
            if (!btn) return;
            var id = btn.getAttribute("data-del-id");
            var products = readProducts().filter(function (p) { return p.id !== id; });
            writeProducts(products);
            renderList();
            showToast("Producto eliminado.");
        });

        /* ── Reset form ── */
        function resetForm() {
            ["f-title", "f-meta", "f-desc", "f-price", "f-img"].forEach(function (id) {
                var el = document.getElementById(id);
                if (el) el.value = "";
            });
            document.querySelectorAll("#cat-grid .cat-chip").forEach(function (chip) {
                chip.classList.remove("checked");
                chip.querySelector("input").checked = false;
            });
            var strip = document.getElementById("img-preview-strip");
            var imgEl = document.getElementById("img-preview-img");
            var prevImg = document.getElementById("prev-img");
            strip.classList.remove("has-img");
            imgEl.classList.remove("visible");
            imgEl.src = "";
            prevImg.className = "preview-card__img";
            prevImg.innerHTML = '<i class="fa-regular fa-image"></i>';
            prevImg.style.cssText = "";
            updatePreview();
        }

        /* ── Save ── */
        document.getElementById("btn-save").addEventListener("click", function () {
            var title = document.getElementById("f-title").value.trim();
            var meta  = document.getElementById("f-meta").value.trim();
            var desc  = document.getElementById("f-desc").value.trim();
            var price = document.getElementById("f-price").value.trim();
            var img   = document.getElementById("f-img").value.trim();
            var cats  = getSelectedCats();

            if (!title || !meta || !desc || !price) {
                showToast("Completa todos los campos obligatorios.", true);
                return;
            }
            if (cats.length === 0) {
                showToast("Selecciona al menos una categoría.", true);
                return;
            }

            var products = readProducts();
            products.push({
                id:       generateId(),
                title:    title,
                meta:     meta,
                desc:     desc,
                price:    price,
                img:      img || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
                category: cats.join(" ")
            });
            writeProducts(products);
            renderList();
            resetForm();
            showToast("¡Producto guardado y publicado en el catálogo!");
        });

        /* ── Init ── */
        document.addEventListener("DOMContentLoaded", function () {
            updatePreview();
            renderList();
        });
    })();
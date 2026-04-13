/**
 * Filter catalog grid by data-catalog-cats.
 * Supports multiple .catalog-filter-root (desktop sidebar + mobile offcanvas).
 * Supports multi-select: clicking a filter toggles it on/off.
 * Clicking "all" clears all active filters and shows everything.
 */
(function () {
    "use strict";

    function initCatalogFilter() {
        var roots = document.querySelectorAll(".catalog-filter-root");
        var items = document.querySelectorAll(".catalog-grid-item[data-catalog-cats]");
        if (!roots.length || !items.length) return;

        var mobileLabel = document.getElementById("catalog-active-filter-label");
        var offcanvasEl = document.getElementById("catalogFiltersOffcanvas");

        var activeFilters = new Set();

        function allFilterButtons() {
            return document.querySelectorAll(".catalog-filter-root [data-catalog-filter]");
        }

        function applyFilters() {
            var isAll = activeFilters.size === 0;

            allFilterButtons().forEach(function (btn) {
                var val = btn.getAttribute("data-catalog-filter");
                var isActive;

                if (val === "all") {
                    isActive = isAll;
                } else {
                    isActive = activeFilters.has(val);
                }

                btn.classList.toggle("active", isActive);
                btn.setAttribute("aria-pressed", isActive ? "true" : "false");
            });

            items.forEach(function (item) {
                if (isAll) {
                    item.hidden = false;
                    return;
                }
                var raw = item.getAttribute("data-catalog-cats") || "";
                var cats = raw.split(/\s+/).filter(Boolean);
                var show = cats.some(function (cat) {
                    return activeFilters.has(cat);
                });
                item.hidden = !show;
            });

            if (mobileLabel) {
                if (isAll) {
                    var allBtn = document.querySelector(
                        '.catalog-filter-root [data-catalog-filter="all"]'
                    );
                    if (allBtn) mobileLabel.textContent = allBtn.textContent.trim();
                } else {
                    mobileLabel.textContent = activeFilters.size + " filtro(s) activo(s)";
                }
            }
        }

        function handleFilterClick(filterValue, closeMobilePanel) {
            if (filterValue === "all") {
                activeFilters.clear();
            } else {
                if (activeFilters.has(filterValue)) {
                    activeFilters.delete(filterValue);
                } else {
                    activeFilters.add(filterValue);
                }
            }

            applyFilters();

            if (
                closeMobilePanel &&
                offcanvasEl &&
                window.bootstrap &&
                window.bootstrap.Offcanvas &&
                window.matchMedia("(max-width: 991.98px)").matches
            ) {
                window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl).hide();
            }
        }

        roots.forEach(function (root) {
            root.addEventListener("click", function (e) {
                var btn = e.target.closest("[data-catalog-filter]");
                if (!btn || !root.contains(btn)) return;
                e.preventDefault();
                handleFilterClick(btn.getAttribute("data-catalog-filter"), true);
            });
        });

        applyFilters();
    }

    document.addEventListener("DOMContentLoaded", initCatalogFilter);
})();
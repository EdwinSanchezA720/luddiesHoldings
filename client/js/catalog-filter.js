/**
 * Filter catalog grid by data-catalog-cats. Supports multiple .catalog-filter-root
 * (desktop sidebar + mobile offcanvas); keeps active state in sync.
 */
(function () {
    "use strict";

    function initCatalogFilter() {
        var roots = document.querySelectorAll(".catalog-filter-root");
        var items = document.querySelectorAll(".catalog-grid-item[data-catalog-cats]");
        if (!roots.length || !items.length) return;

        var mobileLabel = document.getElementById("catalog-active-filter-label");
        var offcanvasEl = document.getElementById("catalogFiltersOffcanvas");

        function allFilterButtons() {
            return document.querySelectorAll(".catalog-filter-root [data-catalog-filter]");
        }

        function apply(filter, closeMobilePanel) {
            allFilterButtons().forEach(function (b) {
                var active = b.getAttribute("data-catalog-filter") === filter;
                b.classList.toggle("active", active);
                b.setAttribute("aria-pressed", active ? "true" : "false");
            });

            items.forEach(function (item) {
                var raw = item.getAttribute("data-catalog-cats") || "";
                var cats = raw.split(/\s+/).filter(Boolean);
                var show = filter === "all" || cats.indexOf(filter) !== -1;
                item.hidden = !show;
            });

            if (mobileLabel) {
                var pick = document.querySelector(
                    '.catalog-filter-root [data-catalog-filter="' + filter + '"]'
                );
                if (pick) {
                    mobileLabel.textContent = pick.textContent.trim();
                }
            }

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
                apply(btn.getAttribute("data-catalog-filter"), true);
            });
        });

        apply("all", false);

        var allowed = [
            "science",
            "technology",
            "engineering",
            "mathematics",
            "neurodiversity",
            "certification",
            "physical",
        ];
        try {
            var q = new URLSearchParams(window.location.search).get("filter");
            if (q && allowed.indexOf(q) !== -1) {
                apply(q, false);
            }
        } catch (ignore) {}
    }

    document.addEventListener("DOMContentLoaded", initCatalogFilter);
})();

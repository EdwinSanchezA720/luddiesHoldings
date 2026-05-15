/**
 * URL del logo: LuddiesConfig.brandLogoUrl, luego ruta relativa a client/js/, luego a la carpeta del HTML.
 * Si la petición falla, usa un SVG embebido para que siempre haya marca visible.
 */
(function () {
    "use strict";

    var REL_SVG = "../images/brand/luddies-imagotipo-alt.svg";

    var INLINE_LOGO =
        "data:image/svg+xml," +
        encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="56" height="56">' +
                '<rect width="56" height="56" rx="12" fill="#1e3a5f"/>' +
                '<text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="#f8fafc" ' +
                'font-family="system-ui,Segoe UI,sans-serif" font-size="22" font-weight="700">L</text>' +
                "</svg>"
        );

    function scriptSrcContains(hint) {
        var list = document.getElementsByTagName("script");
        for (var i = list.length - 1; i >= 0; i--) {
            var s = list[i].getAttribute("src");
            if (s && s.indexOf(hint) !== -1) {
                return s;
            }
        }
        return null;
    }

    function absoluteFromHint(hint, relPath) {
        var src = scriptSrcContains(hint);
        if (!src) {
            return null;
        }
        var jsDir = new URL(src, window.location.href).href.replace(/[^/]+$/, "");
        return new URL(relPath, jsDir).href;
    }

    function fromPageDir(relPath) {
        try {
            var u = new URL(window.location.href);
            var path = u.pathname || "";
            var last = path.lastIndexOf("/");
            if (last < 0) {
                return null;
            }
            var dir = u.origin + path.slice(0, last + 1);
            return new URL(relPath, dir).href;
        } catch (e) {
            return null;
        }
    }

    /** Mismo origen que el API (Spring sirve /images/** bajo apiBaseUrl). */
    function logoUrlFromApiBase() {
        try {
            var c = window.LuddiesConfig || {};
            var base = String(c.apiBaseUrl == null ? "" : c.apiBaseUrl).trim().replace(/\/+$/, "");
            if (!base) {
                return null;
            }
            return base + "/images/brand/luddies-imagotipo-alt.svg";
        } catch (e2) {
            return null;
        }
    }

    function logoUrl() {
        if (window.LuddiesConfig && typeof window.LuddiesConfig.brandLogoUrl === "string") {
            var c = window.LuddiesConfig.brandLogoUrl.trim();
            if (c) {
                return c;
            }
        }
        var fromApi = logoUrlFromApiBase();
        if (fromApi) {
            return fromApi;
        }
        return (
            absoluteFromHint("brand-assets.js", REL_SVG) ||
            absoluteFromHint("layout.js", REL_SVG) ||
            fromPageDir(REL_SVG) ||
            new URL(REL_SVG, window.location.href).href
        );
    }

    function fix(root) {
        var url = logoUrl();
        (root || document).querySelectorAll("img[data-luddies-brand-logo]").forEach(function (img) {
            img.onerror = function () {
                img.onerror = null;
                if (String(img.src || "").indexOf("data:image/svg+xml") === 0) {
                    return;
                }
                img.src = INLINE_LOGO;
            };
            img.src = url;
        });
    }

    window.LuddiesBrandAssets = {
        logoUrl: logoUrl,
        fix: fix
    };

    document.addEventListener("DOMContentLoaded", function () {
        fix(document);
    });
    document.addEventListener("luddies:layout-ready", function () {
        fix(document);
    });
    document.addEventListener("luddies:lang-changed", function () {
        fix(document);
    });
})();

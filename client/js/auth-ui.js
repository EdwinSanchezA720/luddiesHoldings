/**
 * Injects session-aware header actions after layout partials are loaded.
 */
(function () {
    "use strict";

    function run() {
        if (!window.LuddiesAuth) return;
        var session = window.LuddiesAuth.getSession();
        var adminItem = document.getElementById("nav-item-admin");
        var outItem = document.getElementById("nav-item-logout");
        var outLink = document.getElementById("luddies-logout-link");

        if (outItem) {
            outItem.hidden = !session;
        }
        if (adminItem) {
            adminItem.hidden = !session || !window.LuddiesAuth.isAdmin();
        }
        if (outLink) {
            outLink.onclick = function (e) {
                e.preventDefault();
                window.LuddiesAuth.logout();
                window.location.href = "login.html";
            };
        }
        if (window.LuddiesI18n && window.LuddiesI18n.applyTranslations) {
            window.LuddiesI18n.applyTranslations(window.LuddiesI18n.getLang());
        }
    }

    document.addEventListener("luddies:layout-ready", run);
})();

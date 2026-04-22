(function () {
    "use strict";

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phoneRe = /^\+?[\d\s-]{8,20}$/;

    function setAlert(type, id, key) {
        var el = document.getElementById(id);
        if (!el) return;
        el.className = "alert alert-" + (type || "danger");
        if (key && window.LuddiesI18n && window.LuddiesI18n.t) {
            el.textContent = window.LuddiesI18n.t(key);
        }
        el.classList.remove("d-none");
    }

    function hideAlert(id) {
        var el = document.getElementById(id);
        if (el) el.classList.add("d-none");
    }

    function validate(data) {
        if (!data.fullName || data.fullName.length < 2) return "reg_error_name";
        if (!data.email || !emailRe.test(data.email)) return "reg_error_email";
        if (!data.phone || !phoneRe.test(data.phone)) return "reg_error_phone";
        if (!data.password || data.password.length < 6) return "reg_error_password_len";
        if (data.password !== data.confirm) return "reg_error_password_match";
        return null;
    }

    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("register-form");
        if (!form) return;

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            hideAlert("register-error-alert");
            var fullName = (document.getElementById("reg-fullname") && document.getElementById("reg-fullname").value) || "";
            var phone = (document.getElementById("reg-phone") && document.getElementById("reg-phone").value) || "";
            var email = (document.getElementById("reg-email") && document.getElementById("reg-email").value) || "";
            var password = (document.getElementById("reg-password") && document.getElementById("reg-password").value) || "";
            var confirm = (document.getElementById("reg-confirm") && document.getElementById("reg-confirm").value) || "";

            var data = { fullName: fullName.trim(), phone: phone.trim(), email: email.trim(), password: password, confirm: confirm };
            var err = validate(data);
            if (err) {
                setAlert("danger", "register-error-alert", err);
                return;
            }

            if (!window.LuddiesAuth) {
                setAlert("danger", "register-error-alert", "auth_error_generic");
                return;
            }

            if (data.email.toLowerCase() === window.LuddiesAuth.RESERVED_ADMIN_EMAIL) {
                setAlert("danger", "register-error-alert", "reg_error_reserved");
                return;
            }

            var res = window.LuddiesAuth.register({
                fullName: data.fullName,
                phone: data.phone,
                email: data.email,
                password: data.password
            });

            if (res && res.ok) {
                var json = JSON.stringify({
                    fullName: res.user.fullName,
                    phone: res.user.phone,
                    email: res.user.email,
                    role: res.user.role
                });
                try {
                    sessionStorage.setItem("luddies.register.json", json);
                } catch (e2) {
                    /* ignore */
                }
                window.location.href = "login.html?registered=1";
                return;
            }
            if (res && res.error === "email_taken") {
                setAlert("danger", "register-error-alert", "reg_error_taken");
                return;
            }
            setAlert("danger", "register-error-alert", "auth_error_generic");
        });
    });
})();

/**
 * Frontend: URL del API y claves EmailJS (contacto / pago).
 * - `apiBaseUrl`: Spring Boot sin barra final. Vacío = modo demo (solo localStorage).
 * - `emailjs`: rellena solo si usas EmailJS; si quedan vacías, esas partes no envían correo.
 * `__LUDDIES_CONFIG_LOADED__`: lo usa auth.js para saber si este archivo cargó (p. ej. evitar demo si config.js dio 404).
 */
window.__LUDDIES_CONFIG_LOADED__ = true;

window.LuddiesConfig = {
    apiBaseUrl: "http://18.208.174.54:8080/",
    /** Logo barra/pie/login. Vacío: si hay apiBaseUrl → ese origen + /images/brand/luddies-imagotipo-alt.svg; si no, ruta relativa al JS/HTML. */
    brandLogoUrl: "",
    emailjs: {
        publicKeyContact: "",
        serviceIdContact: "",
        templateIdContact: "",

        publicKeyPayment: "",
        serviceIdPayment: "",
        templateIdPayment: "",
    },
};

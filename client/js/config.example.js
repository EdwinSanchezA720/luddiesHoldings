/**
 * config.example.js — Luddies Frontend
 * ─────────────────────────────────────────────────────────────────
 * ESTE ARCHIVO SÍ SE SUBE AL REPOSITORIO.
 * Sirve como contrato de qué variables necesita el proyecto.
 *
 * Cómo usarlo:
 *   1. Copia este archivo como config.js en la misma carpeta (js/)
 *   2. Llena los valores con tus credenciales reales
 *   3. config.js está en .gitignore — nunca se subirá al repo
 * ─────────────────────────────────────────────────────────────────
 */
window.LuddiesConfig = {
    emailjs: {
        // ── Formulario de contacto (contact.html) ──────────────────
        publicKeyContact:  "",   // EmailJS public key para contacto
        serviceIdContact:  "",   // EmailJS service ID para contacto
        templateIdContact: "",   // EmailJS template ID para contacto

        // ── Confirmación de pago (payment.html) ────────────────────
        publicKeyPayment:  "",   // EmailJS public key para pagos
        serviceIdPayment:  "",   // EmailJS service ID para pagos
        templateIdPayment: ""    // EmailJS template ID para pagos
    }
};

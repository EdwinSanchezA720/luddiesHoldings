document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");
    
    if (!fadeElements.length) return;

    const observer = new IntersectionObserver(
        function (entries, activeObserver) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("active");
                activeObserver.unobserve(entry.target);
            });
        },
        { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    fadeElements.forEach(element => observer.observe(element));
});

// Transición de carrusel "Nuestro equipo"
const track = document.getElementById("track");
const carrusel = document.getElementById("carrusel");

if (track && carrusel) {
    let speed = 0.4;
    let position = 0;

    // Duplicar contenido para infinito
    track.innerHTML += track.innerHTML; 

    function animar() {
        position -= speed;
        
        if (position <= -track.scrollWidth / 2) {
            position = 0;
        }
        
        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animar);
    }
    
    animar();

    // Pausar al hover
    carrusel.addEventListener("pointerenter", () => speed = 0);
    carrusel.addEventListener("pointerleave", () => speed = 0.4);

    // Botones de carrusel
    const btnPrev = document.getElementById("prev");
    const btnFast = document.getElementById("fast");

    // Retroceder
    if (btnPrev && btnFast) {
        btnPrev.addEventListener("pointerdown", () => speed = -5);
        btnPrev.addEventListener("pointerup", () => speed = 0.4);
        btnFast.addEventListener("pointerdown", () => speed = 5);
        btnFast.addEventListener("pointerup", () => speed = 0.4);
    }
}

const translations = {
    es: {
        logo_alt: "Logo Luddies",
        brand_name: "Luddies",
        nav_home: "Inicio",
        nav_catalog: "Catálogo",
        nav_community: "Comunidad",
        nav_about: "About Us",
        nav_profile: "Perfil",
        hero_title: "Creamos experiencias STEM para transformar el futuro.",
        hero_lead: "En Luddies impulsamos el aprendizaje práctico, inclusivo y colaborativo para que más niños y jóvenes en Latinoamérica desarrollen habilidades científicas y tecnológicas reales.",
        hero_cta: "Conoce nuestra comunidad",
        who_title: "Quiénes somos",
        who_desc: "Somos una organización educativa y tecnológica enfocada en democratizar el acceso a formación STEM de calidad.",
        mission_title: "Misión",
        mission_desc: "Democratizar la educación STEM en Latinoamérica mediante experiencias de aprendizaje prácticas.",
        vision_title: "Visión",
        vision_desc: "Ser la plataforma referente de innovación educativa STEM.",
        values_title: "Nuestros valores",
        values_subtitle: "Principios que guían cada programa y experiencia.",
        val_inno_title: "Innovación",
        val_inno_desc: "Promovemos metodologías activas y herramientas digitales.",
        val_inclu_title: "Inclusión",
        val_inclu_desc: "Diseñamos experiencias para que cualquier estudiante pueda participar.",
        val_excel_title: "Excelencia",
        val_excel_desc: "Buscamos resultados medibles con contenidos de alta calidad.",
        team_title: "Nuestro equipo",
        team_subtitle: "Profesionales comprometidos con la educación y la tecnología.",
        team_pm: "Project Manager",
        team_back: "Back-end Dev",
        team_front: "Front-end Dev",
        team_ux: "UX/UI Designer",
        btn_prev: "Retroceder",
        btn_next: "Avanzar",
        cta_title: "Construyamos juntos la próxima generación de talento STEM.",
        cta_desc: "Únete a nuestra comunidad o conoce nuestros programas.",
        cta_contact: "Contáctanos",
        cta_back: "Volver a Inicio",
        footer_copy: "© 2026 Luddies. Educación STEM para todos."
    },
    en: {
        logo_alt: "Luddies Logo",
        brand_name: "Luddies",
        nav_home: "Home",
        nav_catalog: "Catalog",
        nav_community: "Community",
        nav_about: "About Us",
        nav_profile: "Profile",
        hero_title: "We create STEM experiences to transform the future.",
        hero_lead: "At Luddies we promote practical, inclusive, and collaborative learning across Latin America.",
        hero_cta: "Meet our community",
        who_title: "Who we are",
        who_desc: "We are an educational and tech organization focused on democratizing quality STEM training.",
        mission_title: "Mission",
        mission_desc: "To democratize STEM education in Latin America through practical learning.",
        vision_title: "Vision",
        vision_desc: "To be the leading platform for STEM educational innovation.",
        values_title: "Our Values",
        values_subtitle: "Principles that guide every program and experience.",
        val_inno_title: "Innovation",
        val_inno_desc: "We promote active methodologies and digital tools.",
        val_inclu_title: "Inclusion",
        val_inclu_desc: "We design experiences so any student can participate.",
        val_excel_title: "Excellence",
        val_excel_desc: "We seek measurable results with high-quality content.",
        team_title: "Our Team",
        team_subtitle: "Professionals committed to education and technology.",
        team_pm: "Project Manager",
        team_back: "Back-end Dev",
        team_front: "Front-end Dev",
        team_ux: "UX/UI Designer",
        btn_prev: "Previous",
        btn_next: "Next",
        cta_title: "Let's build the next generation of STEM talent together.",
        cta_desc: "Join our community or discover our programs.",
        cta_contact: "Contact Us",
        cta_back: "Back to Home",
        footer_copy: "© 2026 Luddies. STEM education for everyone."
    }
};

    /* ══════════════════════════════════════
       VALIDACION DEL FORMULARIO - contact-us
    ══════════════════════════════════════ */
    (function () {
        "use strict";

        const form = document.getElementById("contactUsForm");
        const btnSubmit = document.getElementById("btnSubmit");
        const successBanner = document.getElementById("successBanner");
        const btnNew = document.getElementById("btnNewMessage");
        const inputMensaje = document.getElementById("inputMensaje");
        const charCounter = document.getElementById("charCounterMensaje");
        const fields = Array.from(form.querySelectorAll("input, select, textarea"));

        const messages = {
            inputNombre: {
                valueMissing: "El nombre es obligatorio.",
                tooShort: "El nombre debe tener al menos 2 caracteres.",
                patternMismatch: "El nombre no debe contener números ni caracteres especiales."
            },
            inputCorreo: {
                valueMissing: "El correo electrónico es obligatorio.",
                typeMismatch: "Ingresa un correo válido (ej: usuario@dominio.com)."
            },
            inputAsunto: {
                valueMissing: "Por favor selecciona un motivo de contacto."
            },
            inputMensaje: {
                valueMissing: "El mensaje es obligatorio.",
                tooShort: "El mensaje debe tener al menos 10 caracteres."
            }
        };

        function getErrorNodes(field) {
            const container = document.getElementById("error" + field.id.replace("input", ""));
            const text = document.getElementById((container ? container.id : "") + "Text");
            return { container, text };
        }

        function getMessage(field) {
            const cfg = messages[field.id] || {};
            if (field.validity.valueMissing) return cfg.valueMissing || "Este campo es obligatorio.";
            if (field.validity.typeMismatch) return cfg.typeMismatch || "Formato inválido.";
            if (field.validity.tooShort) return cfg.tooShort || "El valor es demasiado corto.";
            if (field.validity.patternMismatch) return cfg.patternMismatch || "El formato no es válido.";
            return "";
        }

        function updateField(field) {
            const valid = field.checkValidity();
            const { container, text } = getErrorNodes(field);
            field.classList.toggle("is-invalid", !valid);
            field.classList.toggle("is-valid", valid);
            if (container) container.classList.toggle("visible", !valid);
            if (text) text.textContent = valid ? "" : getMessage(field);
            return valid;
        }

        function resetUI() {
            fields.forEach((field) => {
                field.classList.remove("is-valid", "is-invalid");
                const { container, text } = getErrorNodes(field);
                if (container) container.classList.remove("visible");
                if (text) text.textContent = "";
            });
            charCounter.textContent = "0 / 500";
            charCounter.classList.remove("near-limit");
        }

        inputMensaje.addEventListener("input", () => {
            const len = inputMensaje.value.length;
            charCounter.textContent = len + " / 500";
            charCounter.classList.toggle("near-limit", len >= 450);
            if (inputMensaje.classList.contains("is-invalid")) updateField(inputMensaje);
        });

        fields.forEach((field) => {
            field.addEventListener("blur", () => updateField(field));
            field.addEventListener("input", () => {
                if (field.classList.contains("is-invalid")) updateField(field);
            });
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const allValid = fields.every(updateField);
            if (!allValid) {
                const firstInvalid = form.querySelector(".is-invalid");
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            btnSubmit.disabled = true;
            btnSubmit.classList.add("loading");

            setTimeout(() => {
                btnSubmit.disabled = false;
                btnSubmit.classList.remove("loading");
                form.style.display = "none";
                successBanner.classList.add("visible");
            }, 1400);
        });

        btnNew.addEventListener("click", () => {
            form.reset();
            resetUI();
            successBanner.classList.remove("visible");
            form.style.display = "block";
            document.getElementById("inputNombre").focus();
        });
    })();

let currentLang = "es";

document.addEventListener("DOMContentLoaded", () => {
    const langToggleBtn = document.getElementById("lang-toggle");
    
    if (!langToggleBtn) return;

    langToggleBtn.addEventListener("click", (e) => {
        e.preventDefault(); 
        
        currentLang = currentLang === "es" ? "en" : "es";
        langToggleBtn.textContent = currentLang === "es" ? "EN" : "ES";

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            
            if (translations[currentLang][key]) {
                if (el.tagName === 'IMG') {
                    el.setAttribute('alt', translations[currentLang][key]);
                } else if (el.tagName === 'SPAN' || el.children.length === 0) {
                    el.textContent = translations[currentLang][key];
                }
            }
        });
    });
});
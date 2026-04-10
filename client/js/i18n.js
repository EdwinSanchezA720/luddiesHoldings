/**
 * Bilingual copy (es / en) and language toggle.
 * Applies [data-i18n], [data-i18n-html], [data-i18n-placeholder], and option[data-i18n].
 */
(function () {
    "use strict";

    var STORAGE_KEY = "luddies.lang";

    var translations = {
        es: {
            logo_alt: "Logo Luddies",
            brand_name: "Luddies",
            nav_home: "Inicio",
            nav_catalog: "Catalogo",
            nav_community: "Comunidad",
            nav_about: "Nosotros",
            nav_contact: "Contacto",
            nav_profile: "Perfil",
            hero_title: "Creamos experiencias STEM para transformar el futuro.",
            hero_lead:
                "En Luddies impulsamos el aprendizaje practico, inclusivo y colaborativo para que mas ninos y jovenes en Latinoamerica desarrollen habilidades cientificas y tecnologicas reales.",
            hero_cta: "Conoce nuestra comunidad",
            hero_image_alt: "Equipo de Luddies colaborando en un espacio creativo",
            who_title: "Quienes somos",
            who_desc:
                "Somos una organizacion educativa y tecnologica enfocada en democratizar el acceso a formacion STEM de calidad. Disenamos rutas de aprendizaje conectadas con retos reales y acompanamos a estudiantes, docentes y familias en su crecimiento.",
            mission_title: "Mision",
            mission_desc:
                "Democratizar la educacion STEM en Latinoamerica mediante experiencias de aprendizaje practicas, accesibles y centradas en la curiosidad de cada estudiante.",
            vision_title: "Vision",
            vision_desc:
                "Ser la plataforma referente de innovacion educativa STEM, conectando comunidades de aprendizaje que construyen soluciones para los desafios del futuro.",
            values_title: "Nuestros valores",
            values_subtitle: "Principios que guian cada programa, mentoria y experiencia que construimos.",
            val_inno_title: "Innovacion",
            val_inno_desc: "Promovemos metodologias activas y herramientas digitales para aprender haciendo.",
            val_inclu_title: "Inclusion",
            val_inclu_desc: "Disenamos experiencias para que cualquier estudiante pueda participar y crecer.",
            val_excel_title: "Excelencia",
            val_excel_desc: "Buscamos resultados medibles con contenidos de alta calidad academica y humana.",
            team_title: "Nuestro equipo",
            team_subtitle:
                "Profesionales comprometidos con la educacion, la tecnologia y el impacto social.",
            team_bio_antonio:
                "Lider en codigo y colaboracion, haciendo que las ideas cobren vida.",
            team_bio_azul:
                "Apasionado por la creatividad, siempre buscando el por que de los comos.",
            team_bio_julio: "Diseno soluciones digitales practicas, innovadoras y escalables.",
            team_bio_cleyri: "Apasionada por la tecnologia, enfocada en soluciones back-end.",
            team_bio_daniela:
                "Transformo ideas en codigo, construyendo soluciones practicas e innovadoras.",
            team_bio_diego: "Apasionado por crear aplicaciones que simplifican la vida.",
            team_bio_edwin: "Codificando suenos y proyectos con creatividad y precision.",
            team_bio_erick: "Me encanta innovar y explorar nuevas tecnologias.",
            contact_form_title: "Envianos un mensaje",
            contact_form_intro:
                "Completa el formulario y te responderemos lo antes posible. Los campos marcados con * son obligatorios.",
            contact_section_details: "Tus datos",
            contact_section_message: "Tu mensaje",
            contact_hero_title: "Hablemos.",
            contact_hero_lead:
                "Tienes una pregunta, quieres colaborar o simplemente quieres saber mas sobre Luddies? Estamos aqui para escucharte.",
            lbl_nombre: "Nombre completo",
            lbl_correo: "Correo electronico",
            lbl_asunto: "Motivo de contacto",
            lbl_mensaje: "Mensaje",
            ph_nombre: "Ej. Ana Garcia",
            ph_correo: "correo@ejemplo.com",
            ph_mensaje: "Cuentanos en que podemos ayudarte...",
            opt_asunto_placeholder: "- Selecciona una opcion -",
            opt_informacion: "Informacion general",
            opt_cursos: "Cursos y certificaciones",
            opt_colaboracion: "Colaboracion o alianza",
            opt_soporte: "Soporte tecnico",
            opt_otro: "Otro",
            btn_send: "Enviar mensaje",
            btn_clear_form: "Nuevo mensaje",
            success_title: "Mensaje enviado!",
            success_msg: "Gracias por contactarnos. Nos comunicaremos contigo pronto.",
            info_card_title: "Como podemos ayudarte?",
            info_card_copy:
                "Estamos aqui para responder tus dudas y apoyarte en tu camino de aprendizaje STEM.",
            info_email_lbl: "Correo",
            info_hours_lbl: "Horario de atencion",
            info_location_lbl: "Ubicacion",
            info_response_lbl: "Tiempo de respuesta",
            info_hours_val: "Lunes a viernes, 09:00 a 18:00 (CST)",
            info_location_val: "Ciudad de Mexico, Mexico",
            info_response_val: "Respondemos en menos de 48 horas habiles",
            footer_desc:
                "Impulsamos el aprendizaje STEM con experiencias practicas, inclusivas y colaborativas.",
            footer_explore_title: "Explorar",
            footer_support_title: "Soporte",
            footer_link_home: "Inicio",
            footer_link_catalog: "Catalogo",
            footer_link_community: "Comunidad",
            footer_link_about: "Nosotros",
            footer_link_contact: "Contacto",
            footer_link_terms: "Terminos y Condiciones",
            footer_link_privacy: "Aviso de Privacidad",
            footer_copy: "2026 Luddies. Educacion STEM para todos.",
            terms_hero_title: "Terminos y Condiciones",
            terms_hero_lead: "Lee con atencion los terminos que rigen el uso de la plataforma Luddies.",
            privacy_hero_title: "Aviso de Privacidad",
            privacy_hero_lead: "Conoce como protegemos y gestionamos tus datos personales en la plataforma Luddies.",
        },
        en: {
            logo_alt: "Luddies logo",
            brand_name: "Luddies",
            nav_home: "Home",
            nav_catalog: "Catalog",
            nav_community: "Community",
            nav_about: "About Us",
            nav_contact: "Contact",
            nav_profile: "Profile",
            hero_title: "We create STEM experiences to transform the future.",
            hero_lead:
                "At Luddies we promote practical, inclusive, and collaborative learning so more children and youth across Latin America develop real scientific and technological skills.",
            hero_cta: "Meet our community",
            hero_image_alt: "Luddies team collaborating in a creative space",
            who_title: "Who we are",
            who_desc:
                "We are an educational and technology organization focused on democratizing access to quality STEM training. We design learning paths tied to real challenges and support students, teachers, and families as they grow.",
            mission_title: "Mission",
            mission_desc:
                "Democratize STEM education in Latin America through practical, accessible experiences centered on each learner's curiosity.",
            vision_title: "Vision",
            vision_desc:
                "To be the leading STEM educational innovation platform, connecting learning communities that build solutions for tomorrow's challenges.",
            values_title: "Our values",
            values_subtitle:
                "Principles that guide every program, mentorship, and experience we build.",
            val_inno_title: "Innovation",
            val_inno_desc:
                "We promote active methodologies and digital tools for learning by doing.",
            val_inclu_title: "Inclusion",
            val_inclu_desc: "We design experiences so any student can participate and grow.",
            val_excel_title: "Excellence",
            val_excel_desc:
                "We seek measurable results with high-quality academic and human content.",
            team_title: "Our team",
            team_subtitle:
                "Professionals committed to education, technology, and social impact.",
            team_bio_antonio:
                "Leads with code and collaboration, helping ideas come to life.",
            team_bio_azul:
                "Passionate about creativity, always asking why behind the how.",
            team_bio_julio: "Designs practical, innovative, and scalable digital solutions.",
            team_bio_cleyri: "Passionate about technology, focused on back-end solutions.",
            team_bio_daniela:
                "Turns ideas into code, building practical and innovative solutions.",
            team_bio_diego: "Passionate about building applications that simplify everyday life.",
            team_bio_edwin: "Coding dreams and projects with creativity and precision.",
            team_bio_erick: "Loves innovating and exploring new technologies.",
            contact_form_title: "Send us a message",
            contact_form_intro:
                "Fill out the form and we will get back to you as soon as possible. Fields marked with * are required.",
            contact_section_details: "Your details",
            contact_section_message: "Your message",
            contact_hero_title: "Let's talk.",
            contact_hero_lead:
                "Have a question, want to collaborate, or simply want to know more about Luddies? We are here to listen.",
            lbl_nombre: "Full name",
            lbl_correo: "Email",
            lbl_asunto: "Reason for contact",
            lbl_mensaje: "Message",
            ph_nombre: "e.g. Jane Doe",
            ph_correo: "you@example.com",
            ph_mensaje: "Tell us how we can help...",
            opt_asunto_placeholder: "- Select an option -",
            opt_informacion: "General information",
            opt_cursos: "Courses and certifications",
            opt_colaboracion: "Partnership or collaboration",
            opt_soporte: "Technical support",
            opt_otro: "Other",
            btn_send: "Send message",
            btn_clear_form: "New message",
            success_title: "Message sent!",
            success_msg: "Thank you for contacting us. We will get back to you soon.",
            info_card_title: "How can we help?",
            info_card_copy: "We are here to answer your questions and support your STEM journey.",
            info_email_lbl: "Email",
            info_hours_lbl: "Business hours",
            info_location_lbl: "Location",
            info_response_lbl: "Response time",
            info_hours_val: "Monday to Friday, 9:00 a.m. to 6:00 p.m. (CST)",
            info_location_val: "Mexico City, Mexico",
            info_response_val: "We respond within 48 business hours.",
            footer_desc:
                "We drive STEM learning with practical, inclusive, and collaborative experiences.",
            footer_explore_title: "Explore",
            footer_support_title: "Support",
            footer_link_home: "Home",
            footer_link_catalog: "Catalog",
            footer_link_community: "Community",
            footer_link_about: "About",
            footer_link_contact: "Contact",
            footer_link_terms: "Terms and conditions",
            footer_link_privacy: "Privacy notice",
            footer_copy: "2026 Luddies. STEM education for everyone.",
            terms_hero_title: "Terms and conditions",
            terms_hero_lead: "Please read the terms that govern use of the Luddies platform.",
            privacy_hero_title: "Privacy notice",
            privacy_hero_lead: "Learn how we protect and manage your personal data on Luddies.",
        },
    };

    (function mergeLegalTranslations() {
        var L = window.__luddiesLegalTranslations;
        if (!L || !L.es || !L.en) return;
        Object.assign(translations.es, L.es);
        Object.assign(translations.en, L.en);
    })();

    var contactValidation = {
        es: {
            inputNombre: {
                valueMissing: "El nombre es obligatorio.",
                tooShort: "El nombre debe tener al menos 2 caracteres.",
                patternMismatch: "El nombre no debe contener numeros ni caracteres especiales.",
            },
            inputCorreo: {
                valueMissing: "El correo electronico es obligatorio.",
                typeMismatch: "Ingresa un correo valido (ej: usuario@dominio.com).",
            },
            inputAsunto: {
                valueMissing: "Por favor selecciona un motivo de contacto.",
            },
            inputMensaje: {
                valueMissing: "El mensaje es obligatorio.",
                tooShort: "El mensaje debe tener al menos 10 caracteres.",
            },
        },
        en: {
            inputNombre: {
                valueMissing: "Name is required.",
                tooShort: "Name must be at least 2 characters.",
                patternMismatch: "Name cannot include numbers or special characters.",
            },
            inputCorreo: {
                valueMissing: "Email is required.",
                typeMismatch: "Enter a valid email (e.g. user@domain.com).",
            },
            inputAsunto: {
                valueMissing: "Please select a contact reason.",
            },
            inputMensaje: {
                valueMissing: "Message is required.",
                tooShort: "Message must be at least 10 characters.",
            },
        },
    };

    var currentLang = "es";

    function readStoredLang() {
        try {
            var s = sessionStorage.getItem(STORAGE_KEY);
            if (s === "en" || s === "es") return s;
        } catch (e) {
            /* ignore */
        }
        return "es";
    }

    function applyTranslations(lang) {
        var dict = translations[lang];
        if (!dict) return;

        document.documentElement.setAttribute("lang", lang === "en" ? "en" : "es");

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            var key = el.getAttribute("data-i18n");
            if (!key || !dict[key]) return;
            if (el.tagName === "IMG") {
                el.setAttribute("alt", dict[key]);
            } else if (el.tagName === "OPTION") {
                el.textContent = dict[key];
            } else {
                el.textContent = dict[key];
            }
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
            var key = el.getAttribute("data-i18n-placeholder");
            if (key && dict[key]) {
                el.setAttribute("placeholder", dict[key]);
            }
        });

        document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
            var key = el.getAttribute("data-i18n-html");
            if (key && dict[key]) {
                el.innerHTML = dict[key];
            }
        });

        var toggle = document.getElementById("lang-toggle");
        if (toggle) {
            toggle.textContent = lang === "es" ? "EN" : "ES";
        }
    }

    function setLang(lang) {
        if (lang !== "en" && lang !== "es") return;
        currentLang = lang;
        try {
            sessionStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
            /* ignore */
        }
        applyTranslations(lang);
        document.dispatchEvent(new CustomEvent("luddies:lang-changed", { detail: { lang: lang } }));
    }

    function getLang() {
        return currentLang;
    }

    function getContactValidation() {
        return contactValidation[currentLang] || contactValidation.es;
    }

    window.LuddiesI18n = {
        translations: translations,
        applyTranslations: applyTranslations,
        setLang: setLang,
        getLang: getLang,
        getContactValidation: getContactValidation,
    };

    document.addEventListener("DOMContentLoaded", function () {
        currentLang = readStoredLang();
        applyTranslations(currentLang);
    });

    document.addEventListener("luddies:layout-ready", function () {
        applyTranslations(currentLang);
    });

    document.addEventListener("click", function (e) {
        var btn = e.target.closest("#lang-toggle");
        if (!btn) return;
        e.preventDefault();
        setLang(currentLang === "es" ? "en" : "es");
    });
})();

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
            nav_about: "Nosotros",
            nav_contact: "Contacto",
            nav_checkout: "Mi seleccion",
            nav_profile: "Perfil",
            hero_title: "Creamos experiencias STEM para transformar el futuro.",
            hero_lead:
                "En Luddies impulsamos el aprendizaje practico, inclusivo y colaborativo para que mas ninos y jovenes en Latinoamerica desarrollen habilidades cientificas y tecnologicas reales.",
            hero_cta: "Conoce al equipo",
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
            footer_link_about: "Nosotros",
            footer_link_contact: "Contacto",
            footer_link_checkout: "Mi compra",
            footer_link_terms: "Terminos y Condiciones",
            footer_link_privacy: "Aviso de Privacidad",
            footer_copy: "2026 Luddies. Educacion STEM para todos.",
            terms_hero_title: "Terminos y Condiciones",
            terms_hero_lead: "Lee con atencion los terminos que rigen el uso de la plataforma Luddies.",
            privacy_hero_title: "Aviso de Privacidad",
            privacy_hero_lead: "Conoce como protegemos y gestionamos tus datos personales en la plataforma Luddies.",
            home_hero_title: "Marketplace de activos pedagogicos STEM para Mexico y Latinoamerica",
            home_hero_lead:
                "Conectamos a docentes, familias y creadores con material estandarizado en español: digitales hoy, kits y certificación en expansión.",
            home_hero_img_alt: "Estudiantes explorando un proyecto STEM en el aula",
            home_cta_catalog: "Explorar catalogo",
            home_cta_checkout: "Mi compra",
            home_cta_about: "Nosotros",
            home_cta_contact: "Contacto",
            home_value_title: "Por qué Luddies",
            home_value_subtitle: "Un marketplace pensado para quien enseña y para quien aprende.",
            home_val_b2b_title: "Docentes, familias y escuelas",
            home_val_b2b_desc:
                "B2B y B2C: encuentra activos listos para clase o para casa, con criterios claros de calidad y uso.",
            home_val_spanish_title: "STEM en español, alineado a la región",
            home_val_spanish_desc:
                "Contenido actualizado para contextos latinoamericanos, empezando por México con miras regionales.",
            home_val_standard_title: "Estandarizacion que ahorra tiempo",
            home_val_standard_desc:
                "Jerarquia clara: enfoque, tema, clase y actividad de refuerzo. Menos horas buscando, más horas enseñando.",
            home_lines_title: "Qué encontraras en el catálogo",
            home_line_digital_title: "Activos digitales",
            home_line_digital_desc:
                "PDFs, actividades, posters, presentaciones dinámicas y scripts de planeación de clase.",
            home_line_neuro_title: "Neurodiversidad",
            home_line_neuro_desc: "Recursos visuales y didácticos pensados para TDAH, dislexia y autismo.",
            home_line_cert_title: "Certificación educativa",
            home_line_cert_desc: "Rutas alineadas a estándares tipo SEP, nivel básico, con expansión futura.",
            home_line_kits_title: "Kits de experiencias (próximamente)",
            home_line_kits_desc: "Materiales físicos con narrativa, dinámicas y códigos para el aula.",
            home_hierarchy_title: "Cómo organizamos el material",
            home_hierarchy_subtitle: "Una estructura común para todos los activos",
            home_step_focus: "Enfoque",
            home_step_theme: "Tema",
            home_step_class: "Clase",
            home_step_reinforce: "Actividad de refuerzo",
            home_step_focus_desc: "Área de conocimiento",
            home_step_focus_example: "Ej: Ciencias, Tecnología",
            home_step_theme_desc: "Concepto específico",
            home_step_theme_example: "Ej: Energía, Álgebra",
            home_step_class_desc: "Material listo para usar",
            home_step_class_example: "Ej: PDF, presentación",
            home_step_reinforce_desc: "Consolida el aprendizaje",
            home_step_reinforce_example: "Ej: Ficha, reto, poster",
            home_featured_title: "Destacados del catálogo",
            home_feat_1_title: "Ciencias con experimentos guiados",
            home_feat_1_desc: "Secuencias listas para secundaria con enfoque práctico.",
            home_feat_3_title: "Apoyo neurodivergente",
            home_feat_3_desc: "Plantillas visuales para rutinas y evaluacion inclusiva.",
            home_girls_title: "Girls in STEM",
            home_girls_lead: "Sección dedicada a visibilizar y apoyar a las niñas y mujeres en carreras científicas y tecnológicas.",
            home_girls_cta: "Ver material en el catálogo",
            home_cta_band_title: "¿Eres creador o quieres una alianza B2B?",
            home_cta_band_lead: "Escríbenos para publicar material o integrar Luddies en tu institución.",
            home_cta_band_catalog: "Ver catálogo",
            home_cta_band_contact: "Contactar",
            catalog_hero_title: "Catalogo de activos pedagogicos",
            catalog_hero_lead:
                "Explora, filtra y anade al carrito. Con Ir a compra confirmas pedido y correo; el cobro sera con Stripe (ahora veras una pagina de demostracion).",
            cat_filter_label: "Filtrar por",
            cat_filter_all: "Todos",
            cat_filter_science: "Ciencias",
            cat_filter_technology: "Tecnologia",
            cat_filter_engineering: "Ingenieria",
            cat_filter_mathematics: "Matematicas",
            cat_filter_neurodiversity: "Neurodiversidad",
            cat_filter_certification: "Certificacion",
            cat_filter_physical: "Kits fisicos",
            cat_prod_more_info: "Mas informacion",
            cat_prod_badge_consult: "Consultar",
            cat_prod_badge_soon: "Proximamente",
            cat_acquire_btn: "Adquirir",
            cat_acquire_soon: "Proximamente — no disponible",
            cat_cart_bar: "Tu seleccion: {n} producto(s)",
            cat_cart_contact: "Ir a contacto",
            cat_cart_clear: "Vaciar lista",
            cat_cart_added: "Anadido a tu seleccion",
            cat_cart_toast_added: "Se agrego a tu seleccion: {title}",
            cat_cart_toast_duplicate: "Este producto ya esta en tu seleccion.",
            cat_cart_toast_close: "Cerrar aviso",
            cat_cart_review: "Ir a compra",
            cat_filter_open: "Filtros",
            checkout_hero_title: "Tu compra",
            checkout_hero_lead:
                "Confirma tu carrito e indica el correo para el material. A continuacion veras la pantalla provisional de pago (Stripe llegara pronto).",
            checkout_section_payment: "Pago y envio del material",
            checkout_section_cart: "Carrito",
            checkout_email: "Correo para enviar el material",
            checkout_email_help: "Aqui recibiras instrucciones, enlaces o archivos segun cada activo.",
            checkout_name_optional: "Nombre (opcional)",
            ph_checkout_name_optional: "Para el comprobante o seguimiento",
            ph_checkout_email: "correo@ejemplo.com",
            checkout_anonymous_name: "Comprador catalogo",
            checkout_cart_empty: "Tu carrito esta vacio. Agrega productos desde el catalogo.",
            checkout_back_catalog: "Ir al catalogo",
            checkout_remove: "Quitar",
            checkout_items_count: "{n} producto(s)",
            checkout_subtotal_note: "Precios orientativos; el total se confirma al cerrar la compra contigo.",
            checkout_cta_purchase: "Finalizar compra",
            checkout_disclaimer:
                "El cobro sera con Stripe. Al finalizar compra abrimos una pagina provisional hasta activar el checkout real.",
            checkout_prefill_intro: "Solicitud de compra — activos Luddies:",
            checkout_prefill_email_line: "Correo para envio del material: {email}",
            checkout_prefill_notes: "Notas adicionales:",
            payment_stub_title: "Pago (demostracion)",
            payment_stub_lead:
                "Esta pantalla sustituira al checkout de Stripe. Tu pedido quedo registrado en esta sesion; pronto podras pagar con tarjeta aqui mismo.",
            payment_stub_email_label: "Correo indicado para el material:",
            payment_stub_hint: "Puedes volver al catalogo o al inicio. Si necesitas ayuda, usa Contacto.",
            payment_stub_catalog: "Ir al catalogo",
            payment_stub_home: "Inicio",
            cat_prod_1_price: "Desde $249 MXN",
            cat_prod_2_price: "Desde $199 MXN",
            cat_prod_3_price: "Desde $179 MXN",
            cat_prod_4_price: "Desde $229 MXN",
            cat_prod_5_price: "Desde $259 MXN",
            cat_prod_6_price: "Desde $289 MXN",
            cat_prod_7_price: "Proximamente",
            cat_prod_8_price: "Desde $269 MXN",
            cat_prod_1_title: "Fisica interactiva: energia y movimiento",
            cat_prod_1_desc: "Paquete PDF + presentacion con demos para secundaria.",
            cat_prod_1_meta: "Secundaria · Ciencias",
            cat_prod_2_title: "Robots en el aula con Scratch",
            cat_prod_2_desc: "Guion de clase y retos graduados para primer acercamiento a robotica.",
            cat_prod_2_meta: "Primaria · Tecnologia",
            cat_prod_3_title: "Ingenieria basica: estructuras y materiales",
            cat_prod_3_desc: "Disenos simples con materiales de bajo costo y rúbricas.",
            cat_prod_3_meta: "Primaria · Ingenieria",
            cat_prod_4_title: "Algebra visual con manipulables",
            cat_prod_4_desc: "Secuencia de actividades para ecuaciones y patrones.",
            cat_prod_4_meta: "Secundaria · Matematicas",
            cat_prod_5_title: "Rutinas visuales para aula neurodivergente",
            cat_prod_5_desc: "Tableros y pautas de trabajo para TDAH y autismo.",
            cat_prod_5_meta: "Todos los niveles · Neurodiversidad",
            cat_prod_6_title: "Paquete SEP basico: matematicas",
            cat_prod_6_desc: "Planeacion alineada a competencias clave nivel basico.",
            cat_prod_6_meta: "Primaria · Certificacion",
            cat_prod_7_title: "Kit de experiencias STEM (fisico)",
            cat_prod_7_desc: "Narrativa, dinamicas y codigos para taller presencial. Lanzamiento proximo.",
            cat_prod_7_meta: "Presencial · Kits",
            cat_prod_8_title: "Quimica segura en casa y en clase",
            cat_prod_8_desc: "Fichas de laboratorio guiado y fichas de seguridad.",
            cat_prod_8_meta: "Secundaria · Ciencias",
        },
        en: {
            logo_alt: "Luddies logo",
            brand_name: "Luddies",
            nav_home: "Home",
            nav_catalog: "Catalog",
            nav_about: "About Us",
            nav_contact: "Contact",
            nav_checkout: "My selection",
            nav_profile: "Profile",
            hero_title: "We create STEM experiences to transform the future.",
            hero_lead:
                "At Luddies we promote practical, inclusive, and collaborative learning so more children and youth across Latin America develop real scientific and technological skills.",
            hero_cta: "Meet the team",
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
            footer_link_about: "About",
            footer_link_contact: "Contact",
            footer_link_checkout: "My purchase",
            footer_link_terms: "Terms and conditions",
            footer_link_privacy: "Privacy notice",
            footer_copy: "2026 Luddies. STEM education for everyone.",
            terms_hero_title: "Terms and conditions",
            terms_hero_lead: "Please read the terms that govern use of the Luddies platform.",
            privacy_hero_title: "Privacy notice",
            privacy_hero_lead: "Learn how we protect and manage your personal data on Luddies.",
            home_hero_title: "A STEM pedagogical asset marketplace for Mexico and Latin America",
            home_hero_lead:
                "We connect teachers, families, and creators with standardized Spanish-language resources—digital today, kits and certification as we grow.",
            home_hero_img_alt: "Students exploring a hands-on STEM project in the classroom",
            home_cta_catalog: "Browse catalog",
            home_cta_checkout: "My purchase",
            home_cta_about: "About us",
            home_cta_contact: "Contact",
            home_value_title: "Why Luddies",
            home_value_subtitle: "A marketplace built for people who teach and people who learn.",
            home_val_b2b_title: "Teachers, families, and schools",
            home_val_b2b_desc:
                "B2B and B2C: find classroom- and home-ready assets with clear quality and usage criteria.",
            home_val_spanish_title: "STEM in Spanish, aligned with the region",
            home_val_spanish_desc:
                "Content tuned for Latin American contexts, starting in Mexico with regional expansion in mind.",
            home_val_standard_title: "Standardization that saves time",
            home_val_standard_desc:
                "A clear hierarchy: focus, topic, class session, and reinforcement activity. Less searching, more teaching.",
            home_lines_title: "What you will find in the catalog",
            home_line_digital_title: "Digital assets",
            home_line_digital_desc:
                "PDFs, activities, posters, dynamic presentations, and lesson-planning scripts.",
            home_line_neuro_title: "Neurodiversity",
            home_line_neuro_desc: "Visual and didactic resources designed for ADHD, dyslexia, and autism.",
            home_line_cert_title: "Educational certification paths",
            home_line_cert_desc: "Routes aligned with standards such as Mexico's basic education framework, with more to come.",
            home_line_kits_title: "Experience kits (coming soon)",
            home_line_kits_desc: "Physical materials with narrative, activities, and classroom codes.",
            home_hierarchy_title: "How we organize materials",
            home_hierarchy_subtitle: "A shared structure for every asset",
            home_step_focus: "Focus",
            home_step_theme: "Topic",
            home_step_class: "Class session",
            home_step_reinforce: "Reinforcement activity",
            home_step_focus_desc: "Area of knowledge",
            home_step_focus_example: "e.g. Science, Technology",
            home_step_theme_desc: "Specific concept",
            home_step_theme_example: "e.g. Energy, Algebra",
            home_step_class_desc: "Ready to use material",
            home_step_class_example: "e.g. PDF, presentation",
            home_step_reinforce_desc: "Consolidates learning",
            home_step_reinforce_example: "e.g. Worksheet, challenge",
            home_featured_title: "Featured from the catalog",
            home_feat_1_title: "Science with guided experiments",
            home_feat_1_desc: "Ready-to-run sequences for lower secondary with a hands-on lens.",
            home_feat_3_title: "Neurodiversity-friendly support",
            home_feat_3_desc: "Visual templates for routines and inclusive assessment.",
            home_girls_title: "Girls in STEM",
            home_girls_cta: "Browse materials in the catalog",
            home_cta_band_title: "Are you a creator or interested in a B2B partnership?",
            home_cta_band_lead: "Write to us to publish materials or integrate Luddies at your institution.",
            home_cta_band_catalog: "View catalog",
            home_cta_band_contact: "Get in touch",
            catalog_hero_title: "Pedagogical asset catalog",
            catalog_hero_lead:
                "Browse, filter, and add to your cart. Go to checkout to confirm your order and email; payment will be with Stripe (for now you will see a demo page).",
            cat_filter_label: "Filter by",
            cat_filter_all: "All",
            cat_filter_science: "Science",
            cat_filter_technology: "Technology",
            cat_filter_engineering: "Engineering",
            cat_filter_mathematics: "Mathematics",
            cat_filter_neurodiversity: "Neurodiversity",
            cat_filter_certification: "Certification",
            cat_filter_physical: "Physical kits",
            cat_prod_more_info: "More information",
            cat_prod_badge_consult: "Ask us",
            cat_prod_badge_soon: "Coming soon",
            cat_acquire_btn: "Add to selection",
            cat_acquire_soon: "Coming soon — not available",
            cat_cart_bar: "Your selection: {n} item(s)",
            cat_cart_contact: "Go to contact",
            cat_cart_clear: "Clear list",
            cat_cart_added: "Added to your selection",
            cat_cart_toast_added: "Added to your selection: {title}",
            cat_cart_toast_duplicate: "This product is already in your selection.",
            cat_cart_toast_close: "Dismiss",
            cat_cart_review: "Go to checkout",
            cat_filter_open: "Filters",
            checkout_hero_title: "Your purchase",
            checkout_hero_lead:
                "Confirm your cart and enter the email for your materials. Next you will see the placeholder payment screen (Stripe is coming soon).",
            checkout_section_payment: "Payment and delivery",
            checkout_section_cart: "Cart",
            checkout_email: "Email to send the materials",
            checkout_email_help: "You will receive instructions, links, or files here depending on each asset.",
            checkout_name_optional: "Name (optional)",
            ph_checkout_name_optional: "For your receipt or follow-up",
            ph_checkout_email: "you@example.com",
            checkout_anonymous_name: "Catalog buyer",
            checkout_cart_empty: "Your cart is empty. Add products from the catalog.",
            checkout_back_catalog: "Go to catalog",
            checkout_remove: "Remove",
            checkout_items_count: "{n} item(s)",
            checkout_subtotal_note: "Indicative prices; totals are confirmed when we close your purchase.",
            checkout_cta_purchase: "Complete purchase",
            checkout_disclaimer:
                "Card payments will run through Stripe. Complete purchase opens a placeholder page until live checkout is enabled.",
            checkout_prefill_intro: "Purchase request — Luddies assets:",
            checkout_prefill_email_line: "Email for material delivery: {email}",
            checkout_prefill_notes: "Additional notes:",
            payment_stub_title: "Payment (demo)",
            payment_stub_lead:
                "This screen will be replaced by Stripe Checkout. Your order is stored in this session; soon you will pay by card here.",
            payment_stub_email_label: "Email for delivery:",
            payment_stub_hint: "Return to the catalog or home. If you need help, use Contact.",
            payment_stub_catalog: "Go to catalog",
            payment_stub_home: "Home",
            cat_prod_1_price: "From $249 MXN",
            cat_prod_2_price: "From $199 MXN",
            cat_prod_3_price: "From $179 MXN",
            cat_prod_4_price: "From $229 MXN",
            cat_prod_5_price: "From $259 MXN",
            cat_prod_6_price: "From $289 MXN",
            cat_prod_7_price: "Coming soon",
            cat_prod_8_price: "From $269 MXN",
            cat_prod_1_title: "Interactive physics: energy and motion",
            cat_prod_1_desc: "PDF pack plus slide deck with demos for lower secondary.",
            cat_prod_1_meta: "Lower secondary · Science",
            cat_prod_2_title: "Classroom robots with Scratch",
            cat_prod_2_desc: "Lesson script and leveled challenges for a first robotics experience.",
            cat_prod_2_meta: "Primary · Technology",
            cat_prod_3_title: "Intro engineering: structures and materials",
            cat_prod_3_desc: "Low-cost builds with simple rubrics.",
            cat_prod_3_meta: "Primary · Engineering",
            cat_prod_4_title: "Visual algebra with manipulatives",
            cat_prod_4_desc: "Activity sequence for equations and patterns.",
            cat_prod_4_meta: "Lower secondary · Mathematics",
            cat_prod_5_title: "Visual routines for neurodivergent learners",
            cat_prod_5_desc: "Boards and work guides for ADHD and autism-friendly classrooms.",
            cat_prod_5_meta: "All levels · Neurodiversity",
            cat_prod_6_title: "Basic-education math pack (certification-aligned)",
            cat_prod_6_desc: "Planning aligned to core competencies at the basic level.",
            cat_prod_6_meta: "Primary · Certification",
            cat_prod_7_title: "STEM experience kit (physical)",
            cat_prod_7_desc: "Narrative, activities, and codes for in-person workshops. Launching soon.",
            cat_prod_7_meta: "In person · Kits",
            cat_prod_8_title: "Safe chemistry at home and school",
            cat_prod_8_desc: "Guided lab sheets and safety cards.",
            cat_prod_8_meta: "Lower secondary · Science",
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

    function t(key) {
        var dict = translations[currentLang] || {};
        return dict[key] != null ? dict[key] : key;
    }

    window.LuddiesI18n = {
        translations: translations,
        applyTranslations: applyTranslations,
        setLang: setLang,
        getLang: getLang,
        getContactValidation: getContactValidation,
        t: t,
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

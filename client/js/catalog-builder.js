/**
 * catalog-builder.js
 * Genera la grilla del catálogo a partir de catalogLuddies[]
 * usando <template id="catalog-card-tpl"> y el sistema i18n existente.
 */

const catalogLuddies = [
    { id:"1",  name:"cat_prod_1_title",  img:"https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80",  description:"cat_prod_1_desc",  meta:"cat_prod_1_meta",  price:"cat_prod_1_price",  category:"science" },
    { id:"2",  name:"cat_prod_2_title",  img:"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80",  description:"cat_prod_2_desc",  meta:"cat_prod_2_meta",  price:"cat_prod_2_price",  category:"technology" },
    { id:"3",  name:"cat_prod_3_title",  img:"https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",  description:"cat_prod_3_desc",  meta:"cat_prod_3_meta",  price:"cat_prod_3_price",  category:"engineering" },
    { id:"4",  name:"cat_prod_4_title",  img:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",  description:"cat_prod_4_desc",  meta:"cat_prod_4_meta",  price:"cat_prod_4_price",  category:"mathematics" },
    { id:"5",  name:"cat_prod_5_title",  img:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",  description:"cat_prod_5_desc",  meta:"cat_prod_5_meta",  price:"cat_prod_5_price",  category:"neurodiversity" },
    { id:"6",  name:"cat_prod_6_title",  img:"https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",  description:"cat_prod_6_desc",  meta:"cat_prod_6_meta",  price:"cat_prod_6_price",  category:"certification mathematics" },
    { id:"7",  name:"cat_prod_7_title",  img:"https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",  description:"cat_prod_7_desc",  meta:"cat_prod_7_meta",  price:"cat_prod_7_price",  category:"physical" },
    { id:"8",  name:"cat_prod_8_title",  img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",  description:"cat_prod_8_desc",  meta:"cat_prod_8_meta",  price:"cat_prod_8_price",  category:"science" },
    { id:"9",  name:"cat_prod_9_title",  img:"https://images.unsplash.com/photo-1676285773909-c19b900d3f12?w=1000&auto=format&fit=crop&q=60",  description:"cat_prod_9_desc",  meta:"cat_prod_9_meta",  price:"cat_prod_9_price",  category:"dissidents" },
    { id:"10", name:"cat_prod_10_title", img:"https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80", description:"cat_prod_10_desc", meta:"cat_prod_10_meta", price:"cat_prod_10_price", category:"dissidents technology" },
    { id:"11", name:"cat_prod_11_title", img:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80", description:"cat_prod_11_desc", meta:"cat_prod_11_meta", price:"cat_prod_11_price", category:"dissidents neurodiversity" },
    { id:"12", name:"cat_prod_12_title", img:"https://plus.unsplash.com/premium_photo-1684173662177-2cfca11897ba?w=1000&auto=format&fit=crop&q=60", description:"cat_prod_12_desc", meta:"cat_prod_12_meta", price:"cat_prod_12_price", category:"dissidents" }
];

function buildCatalogCard(product) {
    const tpl = document.getElementById("catalog-card-tpl");
    if (!tpl) return null;

    // Clonamos el template (true = clonar hijos también)
    const clone = tpl.content.cloneNode(true);
    const wrapper = clone.querySelector(".catalog-grid-item");

    // Categorías para el filtro
    wrapper.setAttribute("data-catalog-cats", product.category);

    // Imagen
    const img = clone.querySelector(".catalog-card-img");
    img.src = product.img;
    img.alt = ""; // el alt real lo pone i18n si quieres, o lo dejas vacío (decorativo)

    // Textos — usamos data-i18n para que i18n.js los traduzca automáticamente
    clone.querySelector(".catalog-card-meta").setAttribute("data-i18n", product.meta);
    clone.querySelector(".catalog-card-title").setAttribute("data-i18n", product.name);
    clone.querySelector(".catalog-card-desc").setAttribute("data-i18n", product.description);
    clone.querySelector(".catalog-card-price").setAttribute("data-i18n", product.price);

    // Botón de adquirir
    const btn = clone.querySelector(".js-catalog-acquire");
    btn.setAttribute("data-product-id", product.id);
    btn.setAttribute("data-product-title-key", product.name);
    btn.setAttribute("data-product-price-key", product.price);
    btn.setAttribute("data-i18n", "cat_acquire_btn");

    // Enlace "más info"
    clone.querySelector(".btn-luddies--outline").setAttribute("data-i18n", "cat_prod_more_info");

    // Badge
    clone.querySelector(".catalog-badge").setAttribute("data-i18n", "cat_prod_badge_consult");

    return clone;
}

function renderCatalog() {
    const container = document.getElementById("catalog-products-container");
    if (!container) return;

    const fragment = document.createDocumentFragment();

    catalogLuddies.forEach(function(product) {
        const card = buildCatalogCard(product);
        if (card) fragment.appendChild(card);
    });

    container.appendChild(fragment);

    // Pedimos a i18n que traduzca los nuevos elementos
    if (window.LuddiesI18n && window.LuddiesI18n.applyTranslations) {
        window.LuddiesI18n.applyTranslations(window.LuddiesI18n.getLang());
    }
}

document.addEventListener("DOMContentLoaded", renderCatalog);
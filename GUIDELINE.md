Guía paso a paso
Objetivo: Reemplazar el modal de producto en admin.html/admin-panel.js con el layout de catalog-admin (preview en vivo, chips de categoría, vista previa de imagen).

1. Estilos del modal de catálogo
Los estilos viven en `client/style/pages/admin.css` (fusionados con el resto de la página admin).

2. Reemplazar el modal en admin.html
Busca el <div class="modal fade" id="product-form-modal"...> completo y reemplázalo con uno que tenga el layout de dos columnas (form + preview). El modal body debe contener:
Columna izquierda: campos f-title, f-meta, f-desc, f-price, f-img, image preview strip, cat-chips
Columna derecha: preview card (prev-img, prev-meta, prev-title, prev-desc, prev-price, prev-cats)

3. Modificar admin-panel.js
Cambiar openProductModal y readForm/prefillFormFromProduct para leer/escribir los nuevos IDs (f-title, f-meta, f-desc, f-price, f-img, chips).
Agregar los listeners de preview en vivo (input → updatePreview) y el de imagen dentro de init().

4. CSS unificado
Usar `style/pages/admin.css` (incluye layout del formulario tipo catalog-admin).

Orden de implementación

Mantener / extender `style/pages/admin.css`
Editar admin.html: reemplazar modal body si aplica
Editar admin-panel.js: adaptar prefill, readForm, y agregar preview logic
# Archivos modificados — integración cliente / API (Luddies)

Listado de rutas relativas al directorio `luddiesHoldings/`.

**Mantenimiento:** al hacer cambios en esta integración, añade una entrada en [Registro de cambios](#registro-de-cambios) y actualiza las tablas si añades o mueves archivos.

---

## Registro de cambios

| Fecha | Cambio |
|-------|--------|
| 2026-05-14 | **Live Server / assets:** `window.__LUDDIES_CONFIG_LOADED__` en `config.js`; en `auth.js` si no cargó config y el host es `localhost`/`127.0.0.1`, `apiBaseUrl` por defecto `http://localhost:8080`. Logo: `client/images/brand/luddies-imagotipo-alt.svg` (placeholder); HTML usa `.svg`; `partials/header` deja ruta relativa `../images/...`. Copia/sync en `server/luddies/client` (`auth`, `luddies-api`, `catalog-api-mapper`, `config`, `login`/`register` + scripts en HTML). |
| 2026-05-14 | **Corrección crítica `auth.js`:** se restauró `syncLogin` (código suelto tras `mapAuthUserBody` provocaba **SyntaxError** → no cargaba `LuddiesAuth` y el login mostraba solo `auth_error_generic`). `mapAuthUserBody` tolera cuerpo vacío. `application.properties`: quitado espacio tras `=` en `spring.datasource.password`. `login.js`: `.catch` en la promesa de login. |
| 2026-05-14 | **Login:** validación de formato de correo (misma regex que registro) en `login.js`; API `POST /api/auth/login` responde `400 invalid_email` si el formato no es válido (`AuthController` + `AuthService.isEmailFormatValid`). Registro API reutiliza la misma regla. `insert.sql`: comentario sobre cuentas admin/user demo. |
| 2026-05-14 | **Login API + sesión:** `setSession` acepta `user.id` o `user.userId` (el login con Spring guardaba `userId` undefined). Login API usa `setSession(u)` directo. `insert.sql`: comentario con emails demo y contraseña `123456`. |
| 2026-05-14 | **`config.js` único:** se versiona `client/js/config.js` y `server/luddies/client/js/config.js` (por defecto `apiBaseUrl` local, EmailJS vacío). Eliminado `config.example.js`; quitado `client/js/config.js` del `.gitignore`. |
| 2026-05-14 | **Carrito + pedido + pago → BD:** `luddies-commerce-api.js` (sync `cart_items`, `submitPaidOrder` → `orders`, `order_items`, `payments`, carrito `CONVERTED`). `catalog-cart.js` dispara sync; `payment.js` persiste al confirmar si hay sesión + API. Servidor: `DELETE /api/cart-items/cart/{cartId}`, repositorios `findBy*_Id` / `deleteByCart_Id`. HTML: `catalog`, `checkout`, `payment` cargan `luddies-commerce-api.js` y `config.js` en checkout/payment. i18n `payment_error_server`. |
| 2026-05-14 | Sección **Mapeo cliente ↔ API**: qué usa el cliente hoy, endpoints Spring sin cablear, flujos solo en `localStorage`. |
| 2026-05-14 | Carga de `config.js` en `register`, `login`, `admin` y `catalog` (antes de `luddies-api.js`) para poder definir `apiBaseUrl` hacia Spring Boot. Aviso en consola en modo demo (`auth.js`). Aclaración en este doc: usuario visible en admin pero no en MySQL = modo localStorage. |
| 2026-05-14 | Documento inicial con listado de archivos de la integración API + auth + CORS. |

### FAQ: registro no aparece en MySQL pero sí en el admin

El cliente tiene **dos modos**:

1. **`apiBaseUrl` vacío** → modo **demo**: registro/login usan **`localStorage`**, no MySQL. Los usuarios semilla son `admin@luddies.com.mx` / `user@luddies.com.mx` con contraseña **`123456`** (solo en ese modo).
2. **`apiBaseUrl` apuntando al servidor** → login contra **`/api/auth/login`**, registro `POST /api/auth/register`, admin lista con `GET /api/users`. Los emails demo existen en BD **solo si ejecutaste** `create.sql` + `insert.sql`; la contraseña sembrada en SQL es **`123456`**. Si la BD está vacía o distinta, verás credenciales inválidas.

Comprueba en DevTools → pestaña **Red** que exista la petición a `/api/auth/register` o `/api/users`. Si no hay llamadas al origen del API, sigues en modo demo.

Configura **`client/js/config.js`**: `apiBaseUrl` (p. ej. `http://localhost:8080`) y, si aplica, claves `emailjs`. El archivo está versionado; no subas claves reales a repos públicos.

---

## Mapeo cliente ↔ API (estado actual)

Condición: **solo si `apiBaseUrl` apunta al backend** (`usesApi()` verdadero). Si no, las acciones marcadas como API siguen el **modo demo** (`localStorage`).

### Lo que el cliente estático **sí** llama hoy (vía `auth.js` + `LuddiesApi`)

| Acción en la UI | Peticiones | ¿Persiste en BD? |
|-----------------|------------|------------------|
| Login | `POST /api/auth/login` | Sí (valida usuario existente) |
| Registro | `POST /api/auth/register` | Sí (inserta en `users`) |
| Catálogo (carga) | `GET /api/products`, `GET /api/categories`, `GET /api/product-categories/product/{id}` | Lectura de tablas correspondientes |
| Admin: listado usuarios | `GET /api/users` | Lectura |
| Admin: borrar usuario | `DELETE /api/users/{id}` | Sí |
| Admin: crear/editar producto | `POST` o `PUT /api/products`, `DELETE /api/product-categories/product/{id}`, `GET /api/categories`, `POST /api/product-categories` | Sí |
| Admin: borrar producto | `DELETE /api/products/{id}` | Sí (relación `product_categories` según esquema / cascade) |
| Catálogo: añadir/quitar ítems (usuario logueado + API) | `GET/POST /api/carts`, `DELETE /api/cart-items/cart/{cartId}`, `POST /api/cart-items` | Sí (tablas `carts`, `cart_items`) |
| Pago simulado (usuario logueado + API) | `POST /api/orders`, `POST /api/order-items`, `POST /api/payments`, `PUT /api/carts/{id}` (estado `CONVERTED`) | Sí (`orders`, `order_items`, `payments`, `carts`) |

### Endpoints que **existen en Spring** pero el **cliente HTML no usa** aún

| Prefijo API | Uso típico |
|-------------|------------|
| `/api/orders`, `/api/order-items`, `/api/payments` | Listados / CRUD manual (Postman); el **flujo de pago del sitio** ya crea pedido+pago cuando `apiBaseUrl` + sesión están activos |
| `/api/carts` | El sitio ya crea/sincroniza carrito activo al usar el carrito con API |
| `/api/roles` | Roles |
| `POST` / `PUT` en `/api/users` | CRUD “directo” de usuario (el registro web va por `/api/auth/register`) |
| `POST` / `PUT` / `DELETE` en `/api/categories` | CRUD categorías vía API (el admin solo **lee** categorías para enlazar slugs a productos) |

Puedes comprobarlos con **Postman** o **curl**; si devuelven 200/201 y el datasource es el de MySQL, están persistiendo en BD aunque el front no los llame.

### Flujos del cliente que **no** pasan por Spring (solo navegador)

| Área | Dónde |
|------|--------|
| Carrito / checkout | Sin `apiBaseUrl` o sin sesión: solo `localStorage` (`catalog-cart.js`). Con API + login: además se sincroniza contra MySQL. |
| Contacto | EmailJS (`config.js`), no un endpoint REST de mensajes propio |

---

## Cliente (`client/`)

### HTML (orden típico: `catalog-seed.js` → `config.js` → `luddies-api.js` → `catalog-api-mapper.js` → `auth.js`)

En **register, login, admin, catalog, checkout y payment** se incluye `config.js` (y en catalog/checkout/payment además `luddies-commerce-api.js` tras `auth.js`) para API y comercio.

| Archivo |
|---------|
| `client/html/about-us.html` |
| `client/html/admin.html` |
| `client/html/catalog.html` |
| `client/html/checkout.html` |
| `client/html/payment.html` |
| `client/html/contact.html` |
| `client/html/index.html` |
| `client/html/login.html` |
| `client/html/privacy.html` |
| `client/html/register.html` |
| `client/html/terms.html` |

### JavaScript

| Archivo | Nota |
|---------|------|
| `client/js/luddies-commerce-api.js` | **Nuevo** — carrito servidor + pedido + pago |
| `client/js/luddies-api.js` | **Nuevo** — cliente HTTP JSON |
| `client/js/payment.js` | Modificado — persistencia BD al pagar (con API + sesión) |
| `client/js/catalog-cart.js` | Modificado — sync al servidor tras cambios |
| `client/js/i18n.js` | Modificado — `payment_error_server` |
| `client/js/catalog-api-mapper.js` | **Nuevo** — mapeo producto API ↔ catálogo/admin |
| `client/js/auth.js` | Modificado — modo API con `apiBaseUrl` |
| `client/js/admin-panel.js` | Modificado — carga async, guardar/borrar con Promesas |
| `client/js/catalog-builder.js` | Modificado — `loadProducts`, filtro activos, limpieza del grid |
| `client/js/login.js` | Modificado — login async |
| `client/js/register.js` | Modificado — registro async |
| `client/js/config.js` | `apiBaseUrl` + `emailjs` (plantilla local) |

---

## Servidor (`server/luddies/`)

### Gradle y configuración

| Archivo |
|---------|
| `server/luddies/build.gradle` |
| `server/luddies/src/main/resources/application.properties` |

### Código Java — modificados

| Archivo |
|---------|
| `server/luddies/src/main/java/org/generation/luddies/model/User.java` |
| `server/luddies/src/main/java/org/generation/luddies/repository/ProductCategoryRepository.java` |
| `server/luddies/src/main/java/org/generation/luddies/service/ProductCategoryService.java` |
| `server/luddies/src/main/java/org/generation/luddies/controller/CartItemController.java` |
| `server/luddies/src/main/java/org/generation/luddies/repository/CartItemRepository.java` |
| `server/luddies/src/main/java/org/generation/luddies/repository/CartRepository.java` |
| `server/luddies/src/main/java/org/generation/luddies/repository/OrderItemRepository.java` |
| `server/luddies/src/main/java/org/generation/luddies/repository/OrderRepository.java` |
| `server/luddies/src/main/java/org/generation/luddies/repository/PaymentRepository.java` |
| `server/luddies/src/main/java/org/generation/luddies/service/CartItemService.java` |
| `server/luddies/src/main/java/org/generation/luddies/service/CartService.java` |
| `server/luddies/src/main/java/org/generation/luddies/service/OrderItemService.java` |
| `server/luddies/src/main/java/org/generation/luddies/service/OrderService.java` |
| `server/luddies/src/main/java/org/generation/luddies/service/PaymentService.java` |

| Archivo |
|---------|
| `server/luddies/src/main/java/org/generation/luddies/config/SecurityBeansConfig.java` |
| `server/luddies/src/main/java/org/generation/luddies/config/WebCorsConfig.java` |
| `server/luddies/src/main/java/org/generation/luddies/controller/AuthController.java` |
| `server/luddies/src/main/java/org/generation/luddies/dto/auth/AuthLoginRequest.java` |
| `server/luddies/src/main/java/org/generation/luddies/dto/auth/AuthRegisterRequest.java` |
| `server/luddies/src/main/java/org/generation/luddies/dto/auth/AuthUserResponse.java` |
| `server/luddies/src/main/java/org/generation/luddies/repository/RolesRepository.java` |
| `server/luddies/src/main/java/org/generation/luddies/service/AuthService.java` |
| `server/luddies/src/main/java/org/generation/luddies/util/PhoneParseUtil.java` |

---

## Sin cambios en esta integración

- `client/html/pago.html` (solo redirección a `payment.html`).
- Esquema SQL (`server/src_db/...`) — datos de prueba siguen en `insert.sql` como antes.

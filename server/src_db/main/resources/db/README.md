# Base de datos Luddies Holdings (MySQL)

Scripts para crear el esquema y datos de muestra del backend **Spring Boot + MySQL** del proyecto **Luddies Holdings**.

## Archivos en esta carpeta

| Archivo        | Descripción |
|----------------|-------------|
| `create.sql`   | Crea la base `luddies_holdings`, tablas (InnoDB), restricciones `CHECK`, claves foráneas e índices. |
| `insert.sql`   | Datos de muestra: roles, categorías, usuarios, productos (12 del cliente + 2 personalizados), ~20 vínculos `product_categories`, carritos, órdenes y pagos simulados. |
| `diagrama.mwb` | **Diagrama ER de MySQL Workbench.** No es texto: debe generarse con Workbench (ver abajo). |

## Requisitos

- **MySQL 8.0+** (recomendado 8.0.16 o superior para que se apliquen las restricciones `CHECK`).
- Cliente: `mysql` en terminal, **MySQL Workbench**, o el cliente de tu IDE.

## Ejecutar los scripts (sin errores)

### Opción A: línea de comandos

Desde la raíz del proyecto (ajusta usuario, host y ruta):

```bash
mysql -h localhost -u root -p < server/src_db/main/resources/db/create.sql
mysql -h localhost -u root -p < server/src_db/main/resources/db/insert.sql
```

### Opción B: MySQL Workbench

1. **File → Open SQL Script…** → abre `create.sql`.
2. Ejecuta todo el script (rayo ⚡ o `Ctrl+Shift+Enter`).
3. Repite con `insert.sql`.

### Verificación rápida

```sql
USE luddies_holdings;
SHOW TABLES;
SELECT COUNT(*) FROM products;   -- 14
SELECT COUNT(*) FROM product_categories;  -- 20
SELECT COUNT(*) FROM orders;   -- 3
```

## Generar `diagrama.mwb` (MySQL Workbench)

El formato **`.mwb` es binario** y propio de Workbench; se obtiene así:

### Método 1: Reverse Engineer desde el servidor (recomendado)

1. Asegúrate de haber ejecutado `create.sql` (y opcionalmente `insert.sql`).
2. En Workbench: **Database → Reverse Engineer…**
3. Conéctate al mismo servidor donde está `luddies_holdings`.
4. Elige la base **`luddies_holdings`** y completa el asistente.
5. Revisa el modelo EER generado y guarda: **File → Save Model As…** → `diagrama.mwb` en esta misma carpeta `db/`.

### Método 2: Solo desde el script (sin servidor)

1. **File → New Model**
2. **File → Import → Reverse Engineer MySQL Create Script…**
3. Selecciona `create.sql`
4. **File → Save Model As…** → `diagrama.mwb`

Así el diagrama coincide exactamente con el DDL versionado en el repositorio.

## Datos de demostración

- **Contraseña** de todos los usuarios insertados en `insert.sql`: `123456` (almacenada como hash **bcrypt**).
- **Admin**: `admin@luddies.com.mx`
- **Usuario demo**: `user@luddies.com.mx`
- Órdenes de ejemplo incluyen un flujo **invitado** (`guest_email`) y usuarios registrados.

## Integración futura con Spring Boot (MVC)

- URL JDBC sugerida: `jdbc:mysql://localhost:3306/luddies_holdings?useSSL=false&serverTimezone=America/Mexico_City&characterEncoding=utf8`
- Con `spring.jpa.hibernate.ddl-auto=validate`, el esquema lo define este repositorio SQL, no Hibernate en modo `update`.

## Modelo (resumen)

10 tablas: `roles`, `users`, `categories`, `products`, `product_categories`, `carts`, `cart_items`, `orders`, `order_items`, `payments`.

Relaciones principales: usuario → carritos y órdenes; producto ↔ categorías (N:M); orden 1:1 con pago; ítems de carrito y de orden con snapshot de precio.

# Aogane · Página web

Afilado artesanal de cuchillos profesionales y tienda de cuchillos Dao Vua.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `products.js` | **Lo único que normalmente vas a editar:** precios de afilado, productos, WhatsApp, Instagram, galería. |
| `index.html` | Textos y estructura de la página. |
| `styles.css` | Colores y diseño. |
| `app.js` | Carrito y funcionamiento. |
| `api/checkout.js` | Crea el pago en Mercado Pago (se ejecuta en Vercel). |
| `img/` | Logo (`img/logo.png`) y fotos. |

## Cambiar un precio o producto

1. En GitHub abre `products.js` y haz clic en el lápiz ✏️.
2. Cambia `precio: null` por el precio sin puntos, por ejemplo `precio: 55000`.
   - Con precio → aparece el botón **Agregar** al carrito.
   - Con `null` → aparece **Consultar** por WhatsApp.
3. Clic en **Commit changes**. Vercel publica el cambio solo en ~1 minuto.

Otras opciones por producto (en `products.js`):
- `etiqueta: "Nuevo"` (u "Oferta", "Últimas unidades") → aparece una etiqueta sobre la foto. Bórrala para quitarla.
- `agotado: true` → muestra "Agotado" y el botón cambia a "Avísame" por WhatsApp.
- `imagen: "img/nombre.jpg"` → foto del producto (si no hay, se muestra un dibujo).
- `tipo` → en qué botón del filtro aparece (`chef`, `bunka`, `verduras`, `pescado`, `cleaver`).

## Activar el pago con Mercado Pago

1. Entra a https://www.mercadopago.cl/developers/panel/app y crea una aplicación (tipo "Pagos online", "Checkout Pro").
2. En **Credenciales de producción** copia el **Access Token** (empieza con `APP_USR-`).
3. En Vercel: tu proyecto → **Settings → Environment Variables** → agrega
   - Name: `MP_ACCESS_TOKEN`
   - Value: el Access Token
4. **Deployments → ⋯ → Redeploy**.

Nunca pegues el Access Token en el código ni lo compartas. Mientras no esté configurado, el carrito ofrece enviar el pedido por WhatsApp.

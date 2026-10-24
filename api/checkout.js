// Función de Vercel: crea un pago en Mercado Pago y devuelve el link de pago.
// Requiere la variable de entorno MP_ACCESS_TOKEN (configúrala en Vercel, nunca en el código).

const { PRODUCTS } = require("../products.js");

module.exports = async function handler(req, res) {
  const token = process.env.MP_ACCESS_TOKEN;

  // La página consulta esto para saber si mostrar "Pagar" o "Pedir por WhatsApp"
  if (req.method === "GET") {
    return res.status(200).json({ online: Boolean(token) });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Método no permitido" });
  }

  if (!token) {
    return res.status(503).json({ error: "Pago online no configurado" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const cliente = body.cliente || {};

  // El precio siempre se toma del catálogo, nunca de lo que envía el navegador
  const items = [];
  for (const line of Array.isArray(body.items) ? body.items : []) {
    const p = PRODUCTS.find((x) => x.id === line.id);
    const qty = Math.floor(Number(line.qty));
    if (!p || typeof p.precio !== "number" || p.agotado || !(qty >= 1 && qty <= 10)) {
      return res.status(400).json({ error: "Producto inválido" });
    }
    items.push({
      id: p.id,
      title: `${p.marca} ${p.nombre}`,
      quantity: qty,
      unit_price: p.precio,
      currency_id: "CLP"
    });
  }
  if (!items.length) return res.status(400).json({ error: "Carrito vacío" });

  const origin = `https://${req.headers["x-forwarded-host"] || req.headers.host}`;
  const entrega = cliente.entrega === "regiones"
    ? `Envío a regiones (por pagar): ${String(cliente.direccion || "").slice(0, 200)}`
    : "Retiro en Metro Grecia";

  const preference = {
    items,
    payer: {
      name: String(cliente.nombre || "").slice(0, 100),
      email: String(cliente.email || "").slice(0, 150)
    },
    back_urls: {
      success: `${origin}/?pago=ok`,
      pending: `${origin}/?pago=pendiente`,
      failure: `${origin}/?pago=error`
    },
    auto_return: "approved",
    statement_descriptor: "AOGANE",
    metadata: {
      entrega,
      telefono: String(cliente.telefono || "").slice(0, 30),
      nombre: String(cliente.nombre || "").slice(0, 100)
    }
  };

  try {
    const r = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(preference)
    });
    const data = await r.json();
    if (!r.ok) {
      console.error("Mercado Pago:", data);
      return res.status(502).json({ error: "No se pudo crear el pago" });
    }
    return res.status(200).json({ url: data.init_point });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: "No se pudo conectar con Mercado Pago" });
  }
};

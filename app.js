(function () {
  "use strict";

  var $ = function (s) { return document.querySelector(s); };
  var clp = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
  var money = function (n) { return clp.format(n); };

  function waLink(text) {
    return "https://wa.me/" + SITE.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---------- Siluetas de cuchillos (se usan mientras no haya foto) ----------
  var BLADES = {
    gyuto:       "M112 24 L262 24 Q290 25 298 32 Q246 58 112 60 Z",
    nakiri:      "M112 18 L284 18 Q292 18 292 26 L292 58 Q292 62 286 62 L112 62 Z",
    yanagiba:    "M112 30 L270 30 Q294 31 299 35 Q258 46 112 47 Z",
    deba:        "M112 20 L230 25 Q272 30 296 40 Q230 63 112 64 Z",
    cleaver:     "M112 12 L292 12 L292 66 L112 66 Z",
    kiricleaver: "M112 14 L256 14 L294 34 L294 66 L112 66 Z"
  };
  var EDGES = {
    gyuto:       "M112 56 Q240 54 296 33",
    nakiri:      "M112 58 L290 58",
    yanagiba:    "M112 44 Q250 43 298 35",
    deba:        "M112 60 Q230 59 294 41",
    cleaver:     "M112 62 L292 62",
    kiricleaver: "M112 62 L294 62"
  };

  function knifeSvg(forma, i) {
    var gid = "steel" + i;
    var hole = forma === "cleaver" ? '<circle cx="272" cy="24" r="5" fill="#efe8db"/>' : "";
    return (
      '<svg viewBox="0 0 310 80" role="img" aria-label="Silueta de cuchillo ' + esc(forma) + '">' +
        '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#3b4250"/><stop offset=".35" stop-color="#5d6676"/>' +
          '<stop offset=".7" stop-color="#c9d0da"/><stop offset="1" stop-color="#eef1f5"/>' +
        "</linearGradient></defs>" +
        '<rect x="14" y="31" width="92" height="20" rx="7" class="k-handle"/>' +
        '<rect x="100" y="29" width="14" height="24" rx="2" class="k-ferrule"/>' +
        '<path d="' + BLADES[forma] + '" fill="url(#' + gid + ')"/>' +
        '<path d="' + EDGES[forma] + '" class="k-edge"/>' + hole +
      "</svg>"
    );
  }

  // ---------- Contenido dinámico ----------
  function renderAfilado() {
    $("#priceGrid").innerHTML = AFILADO.map(function (a) {
      return (
        '<article class="price-card">' +
          "<h3>" + esc(a.nombre) + "</h3>" +
          '<p class="ejemplos">' + esc(a.ejemplos) + "</p>" +
          '<div class="precio">' + money(a.precio) + " <small>por pieza</small></div>" +
        "</article>"
      );
    }).join("");
  }

  var filtro = "todos";

  function renderFilters() {
    var chips = [{ id: "todos", nombre: "Todos" }].concat(TIPOS.filter(function (t) {
      return PRODUCTS.some(function (p) { return p.tipo === t.id; });
    }));
    $("#filters").innerHTML = chips.map(function (t) {
      return '<button type="button" class="chip" data-filter="' + esc(t.id) + '" aria-pressed="' + (t.id === filtro) + '">' + esc(t.nombre) + "</button>";
    }).join("");
    var tipo = TIPOS.filter(function (t) { return t.id === filtro; })[0];
    $("#filterUso").textContent = tipo ? tipo.uso : "";
  }

  function renderProducts() {
    $("#productGrid").innerHTML = LINEAS.map(function (l) {
      var items = PRODUCTS.filter(function (p) {
        return p.linea === l.id && (filtro === "todos" || p.tipo === filtro);
      });
      if (!items.length) return "";
      return (
        '<div class="linea">' +
          '<header class="linea-head"><h3>' + esc(l.titulo) + "</h3><p>" + esc(l.texto) + "</p></header>" +
          '<div class="product-grid">' + items.map(productCard).join("") + "</div>" +
        "</div>"
      );
    }).join("");
  }

  function productImg(p, prefix) {
    return p.imagen
      ? '<img src="' + esc(p.imagen) + '" alt="Cuchillo ' + esc(p.marca + " " + p.nombre) + '" loading="lazy">'
      : knifeSvg(p.forma, prefix + PRODUCTS.indexOf(p));
  }

  function consultLink(p) {
    return waLink("Hola Aogane, quiero consultar por el cuchillo " + p.marca + " " + p.nombre + ".");
  }

  function priceHtml(p) {
    if (p.agotado) return '<span class="product-price consultar">Agotado</span>';
    return find(p.id)
      ? '<span class="product-price">' + money(p.precio) + "</span>"
      : '<span class="product-price consultar">Consultar precio</span>';
  }

  function buyBtn(p) {
    if (p.agotado) {
      return '<a class="btn btn-ghost" target="_blank" rel="noopener" href="' + consultLink(p) + '">Avísame</a>';
    }
    return find(p.id)
      ? '<button class="btn btn-blue" data-add="' + esc(p.id) + '">Agregar</button>'
      : '<a class="btn btn-ghost" target="_blank" rel="noopener" href="' + consultLink(p) + '">Consultar</a>';
  }

  function productCard(p) {
    var badge = p.agotado ? "Agotado" : p.etiqueta;
    return (
      '<article class="product' + (p.agotado ? " is-agotado" : "") + '">' +
        '<button type="button" class="product-img" data-detail="' + esc(p.id) + '" aria-label="Ver detalle de ' + esc(p.marca + " " + p.nombre) + '">' +
          productImg(p, "c") +
          (badge ? '<span class="badge">' + esc(badge) + "</span>" : "") +
        "</button>" +
        '<div class="product-body">' +
          '<span class="product-brand">' + esc(p.marca) + "</span>" +
          '<h3><button type="button" class="link-btn" data-detail="' + esc(p.id) + '">' + esc(p.nombre) + "</button></h3>" +
          "<p>" + esc(p.descripcion) + "</p>" +
          '<p class="acero">' + esc(p.acero || "") + "</p>" +
          '<div class="product-foot">' + priceHtml(p) + buyBtn(p) + "</div>" +
        "</div>" +
      "</article>"
    );
  }

  // ---------- Ficha ampliada ----------
  var dialog = $("#productDialog");

  function openDetail(id) {
    var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var tipo = TIPOS.filter(function (t) { return t.id === p.tipo; })[0];
    $("#dialogBody").innerHTML =
      '<div class="detail-img">' + productImg(p, "d") + "</div>" +
      '<div class="detail-info">' +
        '<span class="product-brand">' + esc(p.marca) + "</span>" +
        "<h2>" + esc(p.nombre) + "</h2>" +
        '<p class="detail-acero">' + esc(p.acero || "") + "</p>" +
        "<p>" + esc(p.descripcion) + "</p>" +
        (tipo ? '<p class="detail-uso"><strong>Uso:</strong> ' + esc(tipo.uso) + "</p>" : "") +
        '<div class="detail-price">' + priceHtml(p) + "</div>" +
        '<div class="detail-actions">' + buyBtn(p) +
          '<a class="btn btn-ghost" target="_blank" rel="noopener" href="' +
            waLink("Hola Aogane, me gustaría ver más fotos del " + p.marca + " " + p.nombre + ".") + '">Pedir más fotos</a>' +
        "</div>" +
        '<p class="detail-note">Retiro en Metro Grecia o envío a regiones por pagar.</p>' +
      "</div>";
    if (dialog.showModal) dialog.showModal(); else dialog.setAttribute("open", "");
  }

  function closeDetail() {
    if (dialog.close) dialog.close(); else dialog.removeAttribute("open");
  }

  function renderGallery() {
    var g = $("#gallery");
    var fotos = typeof GALERIA !== "undefined" ? GALERIA : [];
    if (!fotos.length) {
      g.classList.add("empty");
      g.innerHTML = '<p class="quote"><span>研</span>Un buen filo se nota en el servicio.</p>';
      return;
    }
    g.innerHTML = fotos.map(function (f) {
      return '<img src="' + esc(f.src) + '" alt="' + esc(f.alt || "Trabajo de Aogane") + '" loading="lazy">';
    }).join("");
  }

  function renderContact() {
    var items = [
      { ico: "☎", t: "WhatsApp", d: '<a href="' + waLink() + '" target="_blank" rel="noopener">' + esc(SITE.telefonoVisible) + "</a>" },
      { ico: "⌂", t: "Taller", d: esc(SITE.taller) },
      { ico: "⇄", t: "Retiro y entrega", d: "Coordinamos en " + esc(SITE.puntoEntrega) },
      { ico: "✈", t: "Regiones", d: "Envíos por pagar, de cargo del cliente (ida y vuelta para afilado)" }
    ];
    if (SITE.instagram) items.push({ ico: "◎", t: "Instagram", d: '<a href="https://instagram.com/' + esc(SITE.instagram) + '" target="_blank" rel="noopener">@' + esc(SITE.instagram) + "</a>" });
    if (SITE.correo) items.push({ ico: "✉", t: "Correo", d: '<a href="mailto:' + esc(SITE.correo) + '">' + esc(SITE.correo) + "</a>" });
    $("#contactList").innerHTML = items.map(function (i) {
      return '<li><span class="ico" aria-hidden="true">' + i.ico + "</span><div><strong>" + i.t + "</strong><span>" + i.d + "</span></div></li>";
    }).join("");

    var cotizar = waLink("Hola Aogane, quiero cotizar un afilado. Te envío fotos de mis cuchillos.");
    $("#heroWhatsapp").href = cotizar;
    $("#contactWhatsapp").href = cotizar;
    $("#waFloat").href = waLink("Hola Aogane, tengo una consulta.");
    $("#year").textContent = "© " + new Date().getFullYear();
  }

  // ---------- Carrito ----------
  var KEY = "aogane-cart";
  var cart = load();

  function load() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY)) || {};
      // descarta productos que ya no existen o no tienen precio
      Object.keys(raw).forEach(function (id) { if (!find(id)) delete raw[id]; });
      return raw;
    } catch (e) { return {}; }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} }
  function find(id) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      var p = PRODUCTS[i];
      if (p.id === id && typeof p.precio === "number" && p.precio > 0 && !p.agotado) return p;
    }
    return null;
  }
  function lines() {
    return Object.keys(cart).map(function (id) { return { p: find(id), qty: cart[id] }; })
      .filter(function (l) { return l.p && l.qty > 0; });
  }
  function total() { return lines().reduce(function (s, l) { return s + l.p.precio * l.qty; }, 0); }

  function renderCart() {
    var ls = lines();
    var count = ls.reduce(function (s, l) { return s + l.qty; }, 0);
    $("#cartCount").hidden = count === 0;
    $("#cartCount").textContent = count;
    $("#cartEmpty").hidden = ls.length > 0;
    $("#checkoutForm").hidden = ls.length === 0;
    $("#cartItems").innerHTML = ls.map(function (l) {
      return (
        '<li class="cart-item">' +
          '<span class="name">' + esc(l.p.marca + " " + l.p.nombre) + "</span>" +
          "<strong>" + money(l.p.precio * l.qty) + "</strong>" +
          '<span class="sub">' + money(l.p.precio) + " c/u</span>" +
          '<span class="qty">' +
            '<button type="button" data-dec="' + esc(l.p.id) + '" aria-label="Quitar uno">−</button>' +
            "<span>" + l.qty + "</span>" +
            '<button type="button" data-inc="' + esc(l.p.id) + '" aria-label="Agregar uno">+</button>' +
          "</span>" +
        "</li>"
      );
    }).join("");
    $("#cartTotal").textContent = money(total());
  }

  function setQty(id, q) {
    if (q <= 0) delete cart[id]; else cart[id] = Math.min(q, 10);
    save(); renderCart();
  }

  function openCart() {
    $("#drawer").classList.add("open");
    $("#drawer").setAttribute("aria-hidden", "false");
    $("#backdrop").hidden = false;
  }
  function closeCart() {
    $("#drawer").classList.remove("open");
    $("#drawer").setAttribute("aria-hidden", "true");
    $("#backdrop").hidden = true;
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-add],[data-inc],[data-dec],[data-detail],[data-filter]");
    if (!t) return;
    if (t.dataset.filter) { filtro = t.dataset.filter; renderFilters(); renderProducts(); return; }
    if (t.dataset.detail) { openDetail(t.dataset.detail); return; }
    if (t.dataset.add) { closeDetail(); setQty(t.dataset.add, (cart[t.dataset.add] || 0) + 1); openCart(); }
    if (t.dataset.inc) setQty(t.dataset.inc, (cart[t.dataset.inc] || 0) + 1);
    if (t.dataset.dec) setQty(t.dataset.dec, (cart[t.dataset.dec] || 0) - 1);
  });
  $("#cartOpen").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  $("#backdrop").addEventListener("click", closeCart);
  $("#dialogClose").addEventListener("click", closeDetail);
  dialog.addEventListener("click", function (e) { if (e.target === dialog) closeDetail(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeCart(); });

  var form = $("#checkoutForm");
  form.addEventListener("change", function () {
    var regiones = form.entrega.value === "regiones";
    form.querySelector(".only-regiones").hidden = !regiones;
    form.direccion.required = regiones;
  });

  function whatsappOrder(data, pagado) {
    var txt = (pagado ? "Hola Aogane, acabo de pagar este pedido con Mercado Pago:\n" : "Hola Aogane, quiero hacer este pedido:\n") +
      lines().map(function (l) { return "• " + l.qty + " × " + l.p.marca + " " + l.p.nombre + " (" + money(l.p.precio * l.qty) + ")"; }).join("\n") +
      "\nTotal: " + money(total()) +
      "\nEntrega: " + (data.entrega === "regiones" ? "Envío a regiones (por pagar) – " + data.direccion : "Retiro en Metro Grecia") +
      "\nNombre: " + data.nombre + "\nTeléfono: " + data.telefono;
    return waLink(txt);
  }

  // Si Mercado Pago aún no está conectado, el carrito envía el pedido por WhatsApp
  var pagoOnline = false;

  function setCheckoutMode(online) {
    pagoOnline = online;
    $("#payBtn").textContent = online ? "Pagar con Mercado Pago" : "Enviar pedido por WhatsApp";
    $("#payNote").textContent = online
      ? "Pago seguro con tarjeta de crédito o débito a través de Mercado Pago."
      : "Te respondemos por WhatsApp para confirmar stock, entrega y forma de pago.";
    form.email.required = online;
    $("#emailLabel").hidden = !online;
  }

  setCheckoutMode(false);
  fetch("/api/checkout")
    .then(function (r) { return r.ok ? r.json() : { online: false }; })
    .then(function (j) { setCheckoutMode(Boolean(j.online)); })
    .catch(function () {});

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = {
      entrega: form.entrega.value,
      nombre: form.nombre.value.trim(),
      telefono: form.telefono.value.trim(),
      email: form.email.value.trim(),
      direccion: form.direccion.value.trim()
    };
    var btn = $("#payBtn"), msg = $("#formMsg");
    if (!pagoOnline) {
      window.open(whatsappOrder(data), "_blank", "noopener");
      msg.textContent = "¡Listo! Se abrió WhatsApp con tu pedido. Solo falta enviarlo.";
      return;
    }
    btn.disabled = true;
    msg.textContent = "Conectando con Mercado Pago…";

    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: lines().map(function (l) { return { id: l.p.id, qty: l.qty }; }),
        cliente: data
      })
    })
      .then(function (r) { return r.json().then(function (j) { if (!r.ok) throw j; return j; }); })
      .then(function (j) {
        // Se guarda el detalle para avisar por WhatsApp al volver de Mercado Pago
        try { localStorage.setItem(KEY + "-pedido", whatsappOrder(data, true)); } catch (e) {}
        window.location.href = j.url;
      })
      .catch(function () {
        // Si el pago online aún no está configurado, el pedido se envía por WhatsApp
        btn.disabled = false;
        msg.innerHTML = 'El pago online no está disponible en este momento. <a href="' +
          whatsappOrder(data) + '" target="_blank" rel="noopener">Envía tu pedido por WhatsApp</a> y te ayudamos a pagar.';
      });
  });

  // Mensaje al volver desde Mercado Pago
  var estado = new URLSearchParams(location.search).get("pago");
  if (estado) {
    var textos = {
      ok: "¡Gracias! Recibimos tu pago.\n\n¿Nos envías el detalle por WhatsApp para coordinar la entrega?",
      pendiente: "Tu pago quedó pendiente. Apenas se confirme coordinamos la entrega.\n\n¿Nos envías el detalle por WhatsApp?",
      error: "El pago no se completó. Puedes intentarlo de nuevo o escribirnos por WhatsApp."
    };
    var pedido = null;
    try { pedido = localStorage.getItem(KEY + "-pedido"); } catch (e) {}
    if (estado === "ok") { cart = {}; save(); }
    if ((estado === "ok" || estado === "pendiente") && pedido) {
      try { localStorage.removeItem(KEY + "-pedido"); } catch (e) {}
      if (confirm(textos[estado])) location.href = pedido;
    } else {
      alert(textos[estado] || textos.error);
    }
    history.replaceState(null, "", location.pathname + "#tienda");
  }

  // ---------- Menú móvil ----------
  $("#menuBtn").addEventListener("click", function () {
    var open = $("#nav").classList.toggle("open");
    this.setAttribute("aria-expanded", open);
  });
  $("#nav").addEventListener("click", function (e) {
    if (e.target.tagName === "A") { $("#nav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false"); }
  });

  renderAfilado();
  renderFilters();
  renderProducts();
  renderGallery();
  renderContact();
  renderCart();
})();

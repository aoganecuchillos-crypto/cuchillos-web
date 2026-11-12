// ============================================================
//  CATÁLOGO DE AOGANE
//  Para cambiar un precio, edita el número en "precio" (sin puntos).
//  Si "precio" es null, el producto aparece como "Consultar precio"
//  y el botón abre WhatsApp en vez de agregarlo al carrito.
// ============================================================

var SITE = {
  whatsapp: "56978473454",
  telefonoVisible: "+56 9 7847 3454",
  instagram: "aogane.cuchillos", // sin @. Vacío = no se muestra
  correo: "",    // ej: "contacto@aogane.cl". Vacío = no se muestra
  taller: "Peñalolén, Santiago",
  puntoEntrega: "Metro Grecia (Línea 4)"
};

var AFILADO = [
  { nombre: "Cuchillos grandes", ejemplos: "Chef, Deba, Yanagiba, Bunka", precio: 15000 },
  { nombre: "Cuchillos medianos", ejemplos: "Nakiri, Santoku", precio: 10000 },
  { nombre: "Cuchillos pequeños", ejemplos: "Petty, Puntilla", precio: 8000 }
];

// Cada línea de cuchillos aparece como un bloque separado en la tienda
var LINEAS = [
  {
    id: "daovua",
    titulo: "Dao Vua · Forjado artesanal",
    texto: "Forjados a mano en Vietnam en acero al carbono 52100. Filo muy agudo y duradero, fácil de reafilar. Todos incluyen su saya de madera.",
    // Se muestra en la ficha de cada cuchillo de esta línea
    detalle: "El 52100 es un acero alto en carbono y cromo, el mismo que se usa en rodamientos industriales por su resistencia. Su grano muy fino permite un filo agudísimo que dura más entre afilados y resiste el desgaste del uso diario. Se reafila con facilidad en piedra y, con el tiempo, desarrolla una pátina que lo protege y le da carácter único a cada hoja."
  },
  {
    id: "xinzuo",
    titulo: "Xinzuo",
    texto: "Aceros damasco y núcleos japoneses de alta dureza, con terminaciones premium."
  }
];

// Tipos para el filtro de la tienda. Cada producto indica su "tipo".
var TIPOS = [
  { id: "chef", nombre: "Gyuto", uso: "El cuchillo de chef: sirve para casi todo." },
  { id: "bunka", nombre: "Bunka", uso: "Punta en ángulo, cómodo para el día a día." },
  { id: "verduras", nombre: "Nakiri", uso: "Hoja recta, ideal para verduras." },
  { id: "pescado", nombre: "Pescado", uso: "Yanagiba, Deba y Sakimaru: para filetear y cortar pescado." },
  { id: "cleaver", nombre: "Cleaver", uso: "Hoja ancha para picar y trasladar ingredientes." }
];

// Opcional en cada producto:
//   etiqueta: "Nuevo" / "Oferta" / "Últimas unidades"  → aparece una etiqueta sobre la foto
//   agotado: true                                       → muestra "Agotado" y no se puede comprar
//   medidas: "Hoja 25 cm · Mango 14 cm"                 → se muestra bajo el acero
//   imagenes: ["img/a.jpg", "img/b.jpg"]               → varias fotos; la primera es la principal
//   incluye: "Saya (funda) de madera"                   → qué viene con el cuchillo
//   stock: 2                                           → muestra "Quedan 2" y no deja comprar más.
//                                                         Con stock: 0 aparece como agotado. Sin stock = sin límite.
var PRODUCTS = [
  // ---------- DAO VUA ----------
  {
    id: "dv-gyuto",
    linea: "daovua",
    nombre: "Gyuto",
    tipo: "chef",
    marca: "Dao Vua",
    forma: "gyuto",
    imagenes: ["img/daovua/gyuto-1.jpg", "img/daovua/gyuto-2.jpg", "img/daovua/gyuto-3.jpg"],
    incluye: "Saya (funda) de madera",
    acero: "Acero 52100 al carbono · Forjado a mano",
    medidas: "Hoja 25 cm · Mango 14 cm",
    descripcion: "El clásico cuchillo de chef. Versátil para cortar proteínas, verduras y hierbas.",
    stock: 2,
    precio: 169990
  },
  {
    id: "dv-nakiri",
    linea: "daovua",
    nombre: "Nakiri",
    tipo: "verduras",
    marca: "Dao Vua",
    forma: "nakiri",
    imagenes: ["img/daovua/nakiri-1.jpg", "img/daovua/nakiri-2.jpg", "img/daovua/nakiri-3.jpg"],
    incluye: "Saya (funda) de madera",
    acero: "Acero 52100 al carbono · Forjado a mano",
    medidas: "Hoja 18 cm · Mango 13 cm",
    descripcion: "Hoja recta y rectangular, ideal para verduras y cortes finos y parejos.",
    stock: 1,
    precio: 159990
  },
  {
    id: "dv-yanagiba",
    linea: "daovua",
    nombre: "Yanagiba",
    tipo: "pescado",
    marca: "Dao Vua",
    forma: "yanagiba",
    imagenes: ["img/daovua/yanagiba-1.jpg", "img/daovua/yanagiba-2.jpg", "img/daovua/yanagiba-3.jpg"],
    incluye: "Saya (funda) de madera",
    acero: "Acero 52100 al carbono · Forjado a mano",
    medidas: "Hoja 28 cm · Mango 14,5 cm",
    descripcion: "Hoja larga y delgada para cortar pescado crudo en un solo movimiento.",
    stock: 2,
    precio: 169990
  },
  {
    id: "dv-deba",
    linea: "daovua",
    nombre: "Deba",
    tipo: "pescado",
    marca: "Dao Vua",
    forma: "deba",
    imagenes: ["img/daovua/deba-1.jpg", "img/daovua/deba-2.jpg", "img/daovua/deba-3.jpg"],
    incluye: "Saya (funda) de madera",
    acero: "Acero 52100 al carbono · Forjado a mano",
    medidas: "Hoja 20 cm · Mango 13 cm",
    descripcion: "Hoja gruesa y pesada para despiezar pescado y trabajar huesos pequeños.",
    stock: 3,
    precio: 159990
  },
  {
    id: "dv-cleaver",
    linea: "daovua",
    nombre: "Cleaver",
    tipo: "cleaver",
    marca: "Dao Vua",
    forma: "cleaver",
    imagenes: ["img/daovua/cleaver-1.jpg", "img/daovua/cleaver-2.jpg", "img/daovua/cleaver-3.jpg", "img/daovua/cleaver-4.jpg"],
    incluye: "Saya (funda) de madera",
    acero: "Acero 52100 al carbono · Forjado a mano",
    medidas: "Hoja 20 cm · Mango 14 cm",
    descripcion: "Hoja ancha de estilo chino. Pica, aplasta y traslada ingredientes.",
    stock: 1,
    precio: 169990
  },
  {
    id: "dv-kiri-cleaver",
    linea: "daovua",
    nombre: "Kiri-Cleaver",
    tipo: "cleaver",
    marca: "Dao Vua",
    forma: "kiricleaver",
    imagenes: ["img/daovua/kiri-cleaver-1.jpg", "img/daovua/kiri-cleaver-2.jpg", "img/daovua/kiri-cleaver-3.jpg", "img/daovua/kiri-cleaver-4.jpg"],
    incluye: "Saya (funda) de madera",
    acero: "Acero 52100 al carbono · Forjado a mano",
    medidas: "Hoja 20 cm · Mango 13 cm",
    descripcion: "Cleaver con punta en ángulo tipo kiritsuke. Más control en cortes de precisión.",
    stock: 2,
    precio: 169990
  },

  // ---------- XINZUO ----------
  {
    id: "xz-pm80-bunka",
    linea: "xinzuo",
    etiqueta: "Nuevo",
    nombre: "Bunka Damasco",
    tipo: "bunka",
    marca: "Xinzuo",
    serie: "Serie PM80",
    forma: "kiricleaver",
    acero: "Damasco 67 capas · 60±1 HRC",
    descripcion: "Punta en ángulo y hoja ancha para el corte diario, con el dibujo del damasco de 67 capas.",
    precio: 159990
  },
  {
    id: "xz-f3s-deba",
    linea: "xinzuo",
    etiqueta: "Nuevo",
    nombre: "Deba",
    tipo: "pescado",
    marca: "Xinzuo",
    serie: "Serie F3S",
    forma: "deba",
    imagenes: ["img/xinzuo/deba-1.jpg", "img/xinzuo/deba-2.jpg", "img/xinzuo/deba-3.jpg", "img/xinzuo/deba-4.jpg"],
    incluye: "Caja de regalo Xinzuo",
    acero: "Acero 10Cr15CoMoV · 60±1 HRC",
    medidas: "Hoja 19,5 cm · Mango 14 cm",
    descripcion: "Hoja robusta para despiezar pescado. Acero inoxidable premium con muy buena retención de filo.",
    precio: 224990
  },
  {
    id: "xz-f3s-sashimi",
    linea: "xinzuo",
    etiqueta: "Nuevo",
    nombre: "Yanagiba",
    tipo: "pescado",
    marca: "Xinzuo",
    serie: "Serie F3S",
    forma: "yanagiba",
    imagenes: ["img/xinzuo/yanagiba-1.jpg", "img/xinzuo/yanagiba-2.jpg", "img/xinzuo/yanagiba-3.jpg"],
    incluye: "Caja de regalo Xinzuo",
    acero: "Acero 10Cr15CoMoV · 60±1 HRC",
    medidas: "Hoja 28 cm · Mango 14,5 cm",
    descripcion: "Hoja larga para cortes limpios de pescado crudo, en acero inoxidable premium.",
    precio: 224990
  },
  {
    id: "xz-f3-sakimaru",
    linea: "xinzuo",
    etiqueta: "Nuevo",
    nombre: "Sakimaru Damasco",
    tipo: "pescado",
    marca: "Xinzuo",
    serie: "Serie F3",
    forma: "yanagiba",
    imagenes: ["img/xinzuo/sakimaru-1.jpg", "img/xinzuo/sakimaru-2.jpg", "img/xinzuo/sakimaru-3.jpg", "img/xinzuo/sakimaru-4.jpg"],
    incluye: "Caja de regalo Xinzuo",
    acero: "Damasco 110 capas · 60±1 HRC",
    medidas: "Hoja 28 cm · Mango 14,5 cm",
    descripcion: "Cuchillo de sashimi con punta redondeada. Una pieza de colección en damasco de 110 capas.",
    precio: 279990
  },
  {
    id: "xz-pm8b-nakiri",
    linea: "xinzuo",
    etiqueta: "Nuevo",
    nombre: "Nakiri Aogami",
    tipo: "verduras",
    marca: "Xinzuo",
    serie: "Serie PM8B",
    forma: "nakiri",
    acero: "Núcleo japonés Aogami #2 · 62-64 HRC",
    medidas: "Hoja 20 cm · Mango 14 cm",
    descripcion: "Hoja recta para verduras con núcleo de acero azul japonés: filo muy fino y duradero.",
    precio: 234990
  },
  {
    id: "xz-pm8b-bunka",
    linea: "xinzuo",
    etiqueta: "Nuevo",
    nombre: "Bunka Aogami",
    tipo: "bunka",
    marca: "Xinzuo",
    serie: "Serie PM8B",
    forma: "kiricleaver",
    acero: "Núcleo japonés Aogami #2 · 62-64 HRC",
    medidas: "Hoja 22,5 cm · Mango 14 cm",
    descripcion: "Bunka con núcleo de acero azul japonés, para quien busca el máximo filo.",
    precio: 249990
  },
  {
    id: "xz-x08c-nakiri",
    linea: "xinzuo",
    etiqueta: "Nuevo",
    nombre: "Nakiri Damasco Cobre",
    tipo: "verduras",
    marca: "Xinzuo",
    serie: "Serie X08C",
    forma: "nakiri",
    imagenes: ["img/xinzuo/nakiri-cobre-1.jpg", "img/xinzuo/nakiri-cobre-2.jpg", "img/xinzuo/nakiri-cobre-3.jpg", "img/xinzuo/nakiri-cobre-4.jpg"],
    incluye: "Caja de madera de regalo",
    acero: "Damasco 53 capas con cobre · 59-61 HRC",
    medidas: "Hoja 20 cm · Mango 12,5 cm",
    descripcion: "Nakiri en damasco con capas de cobre: una hoja tan funcional como llamativa.",
    precio: 254990
  },
  {
    id: "xz-x08c-bunka",
    linea: "xinzuo",
    etiqueta: "Nuevo",
    nombre: "Bunka Damasco Cobre",
    tipo: "bunka",
    marca: "Xinzuo",
    serie: "Serie X08C",
    forma: "kiricleaver",
    imagenes: ["img/xinzuo/bunka-cobre-1.jpg", "img/xinzuo/bunka-cobre-2.jpg", "img/xinzuo/bunka-cobre-3.jpg", "img/xinzuo/bunka-cobre-4.jpg"],
    incluye: "Caja de madera de regalo",
    acero: "Damasco 53 capas con cobre · 59-61 HRC",
    medidas: "Hoja 22,5 cm · Mango 12,5 cm",
    descripcion: "Bunka en damasco con capas de cobre, de terminación premium.",
    precio: 259990
  }
];

// Fotos para la sección "Sobre Aogane". Sube las fotos a la carpeta img/
// y agrégalas así: { src: "img/taller1.jpg", alt: "Afilando un gyuto en piedra" },
var GALERIA = [
  { src: "img/galeria-1.jpg", alt: "Colección de cuchillos Dao Vua con mangos de madera" },
  { src: "img/galeria-2.jpg", alt: "Tres cuchillos Dao Vua en la mano" },
  { src: "img/galeria-3.jpg", alt: "Bunka, nakiri y petty con sus fundas de madera" },
  { src: "img/galeria-4.jpg", alt: "Cleaver y kiri-cleaver con fundas de madera" },
  { src: "img/galeria-5.jpg", alt: "Gyuto y yanagiba sobre sus fundas" },
  { src: "img/galeria-6.jpg", alt: "Dos cuchillos pequeños con funda de madera" }
];

// Para mostrar fotos reales de un producto, agrega  imagenes: ["img/gyuto-1.jpg", "img/gyuto-2.jpg"]  a ese producto.

// Permite que el servidor de pagos (api/checkout.js) lea este mismo catálogo
if (typeof module !== "undefined") {
  module.exports = { SITE: SITE, PRODUCTS: PRODUCTS };
}

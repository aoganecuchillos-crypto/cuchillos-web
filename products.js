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
  { nombre: "Cuchillos grandes", ejemplos: "Chef, Deba, Yanagiba, Bunka", precio: 10000 },
  { nombre: "Cuchillos medianos", ejemplos: "Nakiri, Santoku", precio: 8000 },
  { nombre: "Cuchillos pequeños", ejemplos: "Petty, Puntilla", precio: 6000 }
];

// Cada línea de cuchillos aparece como un bloque separado en la tienda
var LINEAS = [
  {
    id: "daovua",
    titulo: "Dao Vua · Forjado artesanal",
    texto: "Forjados a mano en Vietnam en acero al carbono 52100: retención de filo y resistencia al desgaste muy superiores al estándar."
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
  { id: "pescado", nombre: "Pescado", uso: "Yanagiba, Deba y Sashimi: para filetear y cortar pescado." },
  { id: "cleaver", nombre: "Cleaver", uso: "Hoja ancha para picar y trasladar ingredientes." }
];

// Opcional en cada producto:
//   etiqueta: "Nuevo" / "Oferta" / "Últimas unidades"  → aparece una etiqueta sobre la foto
//   agotado: true                                       → muestra "Agotado" y no se puede comprar
var PRODUCTS = [
  // ---------- DAO VUA ----------
  {
    id: "dv-gyuto",
    linea: "daovua",
    nombre: "Gyuto",
    tipo: "chef",
    marca: "Dao Vua",
    forma: "gyuto",
    imagen: "img/gyuto.jpg",
    acero: "Acero 52100 al carbono · Forjado a mano",
    descripcion: "El cuchillo de chef japonés. Versátil para cortar proteínas, verduras y hierbas.",
    precio: 169990
  },
  {
    id: "dv-nakiri",
    linea: "daovua",
    nombre: "Nakiri",
    tipo: "verduras",
    marca: "Dao Vua",
    forma: "nakiri",
    imagen: "img/nakiri.jpg",
    acero: "Acero 52100 al carbono · Forjado a mano",
    descripcion: "Hoja recta y rectangular, ideal para verduras y cortes finos y parejos.",
    precio: 159990
  },
  {
    id: "dv-yanagiba",
    linea: "daovua",
    nombre: "Yanagiba",
    tipo: "pescado",
    marca: "Dao Vua",
    forma: "yanagiba",
    imagen: "img/yanagiba.jpg",
    acero: "Acero 52100 al carbono · Forjado a mano",
    descripcion: "Hoja larga y delgada para cortar pescado crudo en un solo movimiento.",
    precio: 169990
  },
  {
    id: "dv-deba",
    linea: "daovua",
    nombre: "Deba",
    tipo: "pescado",
    marca: "Dao Vua",
    forma: "deba",
    imagen: "img/deba.jpg",
    acero: "Acero 52100 al carbono · Forjado a mano",
    descripcion: "Hoja gruesa y pesada para despiezar pescado y trabajar huesos pequeños.",
    precio: 159990
  },
  {
    id: "dv-cleaver",
    linea: "daovua",
    nombre: "Cleaver",
    tipo: "cleaver",
    marca: "Dao Vua",
    forma: "cleaver",
    imagen: "img/cleaver.jpg",
    acero: "Acero 52100 al carbono · Forjado a mano",
    descripcion: "Hoja ancha de estilo chino. Pica, aplasta y traslada ingredientes.",
    precio: 169990
  },
  {
    id: "dv-kiri-cleaver",
    linea: "daovua",
    nombre: "Kiri-Cleaver",
    tipo: "cleaver",
    marca: "Dao Vua",
    forma: "kiricleaver",
    imagen: "img/kiri-cleaver.jpg",
    acero: "Acero 52100 al carbono · Forjado a mano",
    descripcion: "Cleaver con punta en ángulo tipo kiritsuke. Más control en cortes de precisión.",
    precio: 169990
  },

  // ---------- XINZUO ----------
  {
    id: "xz-pm80-bunka",
    linea: "xinzuo",
    etiqueta: "Nuevo",
    nombre: "Bunka",
    tipo: "bunka",
    marca: "Xinzuo · Serie PM80",
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
    marca: "Xinzuo · Serie F3S",
    forma: "deba",
    acero: "Acero 10Cr15CoMoV · 60±1 HRC",
    descripcion: "Hoja robusta para despiezar pescado. Acero inoxidable premium con muy buena retención de filo.",
    precio: 224990
  },
  {
    id: "xz-f3s-sashimi",
    linea: "xinzuo",
    etiqueta: "Nuevo",
    nombre: "Sashimi",
    tipo: "pescado",
    marca: "Xinzuo · Serie F3S",
    forma: "yanagiba",
    acero: "Acero 10Cr15CoMoV · 60±1 HRC",
    descripcion: "Hoja larga para cortes limpios de pescado crudo, en acero inoxidable premium.",
    precio: 224990
  },
  {
    id: "xz-f3-sakimaru",
    linea: "xinzuo",
    etiqueta: "Nuevo",
    nombre: "Sakimaru",
    tipo: "pescado",
    marca: "Xinzuo · Serie F3",
    forma: "yanagiba",
    acero: "Damasco 110 capas · 60±1 HRC",
    descripcion: "Cuchillo de sashimi con punta redondeada. Una pieza de colección en damasco de 110 capas.",
    precio: 279990
  },
  {
    id: "xz-pm8b-nakiri",
    linea: "xinzuo",
    etiqueta: "Nuevo",
    nombre: "Nakiri",
    tipo: "verduras",
    marca: "Xinzuo · Serie PM8B",
    forma: "nakiri",
    acero: "Núcleo japonés Aogami #2 · 62-64 HRC",
    descripcion: "Hoja recta para verduras con núcleo de acero azul japonés: filo muy fino y duradero.",
    precio: 234990
  },
  {
    id: "xz-pm8b-bunka",
    linea: "xinzuo",
    etiqueta: "Nuevo",
    nombre: "Bunka",
    tipo: "bunka",
    marca: "Xinzuo · Serie PM8B",
    forma: "kiricleaver",
    acero: "Núcleo japonés Aogami #2 · 62-64 HRC",
    descripcion: "Bunka con núcleo de acero azul japonés, para quien busca el máximo filo.",
    precio: 249990
  },
  {
    id: "xz-x08c-nakiri",
    linea: "xinzuo",
    etiqueta: "Nuevo",
    nombre: "Nakiri",
    tipo: "verduras",
    marca: "Xinzuo · Serie X08C",
    forma: "nakiri",
    acero: "Damasco 53 capas con cobre · 59-61 HRC",
    descripcion: "Nakiri en damasco con capas de cobre: una hoja tan funcional como llamativa.",
    precio: 254990
  },
  {
    id: "xz-x08c-bunka",
    linea: "xinzuo",
    etiqueta: "Nuevo",
    nombre: "Bunka",
    tipo: "bunka",
    marca: "Xinzuo · Serie X08C",
    forma: "kiricleaver",
    acero: "Damasco 53 capas con cobre · 59-61 HRC",
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

// Para mostrar una foto real de un producto, agrega  imagen: "img/gyuto.jpg"  a ese producto.

// Permite que el servidor de pagos (api/checkout.js) lea este mismo catálogo
if (typeof module !== "undefined") {
  module.exports = { SITE: SITE, PRODUCTS: PRODUCTS };
}

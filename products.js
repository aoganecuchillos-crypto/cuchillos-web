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

var PRODUCTS = [
  {
    id: "dv-gyuto",
    nombre: "Gyuto",
    marca: "Dao Vua",
    forma: "gyuto",
    imagen: "img/gyuto.jpg",
    descripcion: "El cuchillo de chef japonés. Versátil para cortar proteínas, verduras y hierbas.",
    precio: null
  },
  {
    id: "dv-bunka",
    nombre: "Bunka",
    marca: "Dao Vua",
    forma: "kiricleaver",
    imagen: "img/bunka.jpg",
    descripcion: "Punta en ángulo y hoja ancha. Cómodo y preciso para el corte diario de verduras y proteínas.",
    precio: null
  },
  {
    id: "dv-nakiri",
    nombre: "Nakiri",
    marca: "Dao Vua",
    forma: "nakiri",
    imagen: "img/nakiri.jpg",
    descripcion: "Hoja recta y rectangular, ideal para verduras y cortes finos y parejos.",
    precio: null
  },
  {
    id: "dv-yanagiba",
    nombre: "Yanagiba",
    marca: "Dao Vua",
    forma: "yanagiba",
    imagen: "img/yanagiba.jpg",
    descripcion: "Hoja larga y delgada para cortar pescado crudo en un solo movimiento.",
    precio: null
  },
  {
    id: "dv-deba",
    nombre: "Deba",
    marca: "Dao Vua",
    forma: "deba",
    imagen: "img/deba.jpg",
    descripcion: "Hoja gruesa y pesada para despiezar pescado y trabajar huesos pequeños.",
    precio: null
  },
  {
    id: "dv-cleaver",
    nombre: "Cleaver",
    marca: "Dao Vua",
    forma: "cleaver",
    imagen: "img/cleaver.jpg",
    descripcion: "Hoja ancha de estilo chino. Pica, aplasta y traslada ingredientes.",
    precio: null
  },
  {
    id: "dv-kiri-cleaver",
    nombre: "Kiri-Cleaver",
    marca: "Dao Vua",
    forma: "kiricleaver",
    imagen: "img/kiri-cleaver.jpg",
    descripcion: "Cleaver con punta en ángulo tipo kiritsuke. Más control en cortes de precisión.",
    precio: null
  }
];

var ACERO = "Acero 52100 · Hecho a mano en Vietnam";

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

// Límites como constantes con nombre, para no repetir "números mágicos" en el código
const MAX_TITULO = 100;        // un título puede tener hasta 100 caracteres
const MAX_DESCRIPCION = 500;   // una descripción puede tener hasta 500 caracteres

// Responde true si el título sirve: no vacío (ignorando espacios) y no demasiado largo
export const tituloValido = (titulo: string): boolean => {
    const sinEspacios = titulo.trim();               // trim() saca los espacios de los extremos: "  hola " -> "hola"
    return sinEspacios !== "" && sinEspacios.length <= MAX_TITULO; // true solo si NO está vacío Y no se pasa del límite
};

// Responde true si la descripción sirve: puede estar vacía, pero no pasarse del límite
export const descripcionValida = (descripcion: string): boolean =>
    descripcion.length <= MAX_DESCRIPCION;           // vacía mide 0, así que pasa sola: no hace falta un caso aparte

// Responde true si el texto es una fecha real con formato AAAA-MM-DD
export const esFechaValida = (texto: string): boolean => {

    // PASO 1: ¿el texto tiene la forma correcta?
    // Lo que está entre las barras / ... / es una expresión regular: un "molde" para textos
    //   ^      -> el texto EMPIEZA acá (sin esto, "hola 2026-12-31" pasaría)
    //   \d     -> un dígito (0 a 9)
    //   {4}    -> lo anterior, 4 veces (entonces \d{4} = 4 dígitos, el año)
    //   -      -> un guion, tal cual
    //   \d{2}  -> 2 dígitos (el mes), después otro guion, y 2 dígitos más (el día)
    //   $      -> el texto TERMINA acá (sin esto, "2026-12-31 chau" pasaría)
    // .test(texto) -> pregunta "¿este texto encaja en el molde?" y responde true o false
    const tieneFormato = /^\d{4}-\d{2}-\d{2}$/.test(texto);
    if (!tieneFormato) {
        return false;                                // si ni tiene la forma, corto acá y no sigo (ej: "mañana", "31/12/2026")
    }

    // PASO 2: ¿JavaScript logra entenderlo como fecha?
    const fecha = new Date(texto);                   // intento convertir el texto en fecha; si el mes es 13, NO da error: crea una "fecha inválida"
    // getTime() devuelve la fecha como número (milisegundos). En una fecha inválida devuelve NaN
    // NaN significa "Not a Number" (no es un número)
    // Number.isNaN(x) -> devuelve true si x es NaN. No se usa "=== NaN" porque en JavaScript NaN === NaN da false (rareza del lenguaje)
    if (Number.isNaN(fecha.getTime())) {
        return false;                                // ej: "2026-13-45" (el mes 13 no existe)
    }

    // PASO 3: el "ida y vuelta". JavaScript "corrige" fechas imposibles: "2026-02-30" lo corre al 2 de marzo
    // toISOString() convierte la fecha en texto estándar: "2026-03-02T00:00:00.000Z"
    // .slice(0, 10) corta el texto desde la posición 0 hasta la 10 (la 10 no entra): se queda con "2026-03-02"
    // Si lo que vuelve no es igual a lo que escribió el usuario, la fecha no existía
    return fecha.toISOString().slice(0, 10) === texto;
};
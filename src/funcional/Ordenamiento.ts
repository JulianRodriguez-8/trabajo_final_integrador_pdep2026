// Importo Tarea solo como tipo (no la uso con "new" acá), por eso "import type"
import type { Tarea } from "../dominio/Tarea.js";
// Importo el tipo de las dificultades ("Fácil" | "Media" | "Difícil") para armar la tabla de pesos
import type { DificultadTarea } from "../dominio/Tipos.js";

// Comparador = una función que recibe 2 tareas (a y b) y devuelve un número
// número negativo -> "a" va antes que "b"
// número positivo -> "a" va después que "b"
// cero            -> empatan, da igual
export type Comparador = (a: Tarea, b: Tarea) => number;

// Fecha "falsa" muy lejana para las tareas SIN vencimiento 
// así quedan siempre al final cuando ordenamos por vencimiento
const SIN_VENCIMIENTO = "9999-12-31";

// Tabla que traduce cada dificultad a un número, para poder compararlas
// (si las comparara como texto, "Difícil" quedaría antes que "Fácil" por el abecedario)
// Record obliga a poner TODAS las dificultades, si falta una, tsc da error
const ORDEN_DIFICULTAD: Record<DificultadTarea, number> = {
    "Fácil": 1,   // la más fácil pesa menos, va primero
    "Media": 2,   // peso del medio
    "Difícil": 3  // la más difícil pesa más, va última
};

// Comparador por título (alfabético, de la A a la Z)
export const porTitulo: Comparador = (a, b) =>
    // localeCompare compara dos textos y devuelve negativo/0/positivo, entiende tildes y mayúsculas
    a.titulo.localeCompare(b.titulo);

// Comparador por fecha de creación (de la más vieja a la más nueva)
export const porCreacion: Comparador = (a, b) =>
    // getTime() convierte la fecha en un número (milisegundos), restarlos da el signo que sort necesita
    a.creacion.getTime() - b.creacion.getTime();

// Comparador por fecha de vencimiento (las que no tienen quedan al final)
export const porVencimiento: Comparador = (a, b) =>
    // "??" significa: si vencimiento es null, usá la fecha falsa de arriba
    (a.vencimiento ?? SIN_VENCIMIENTO)
        // comparo los textos "YYYY-MM-DD"; en ese formato, el orden alfabético = orden de fechas
        .localeCompare(b.vencimiento ?? SIN_VENCIMIENTO);

// Comparador por dificultad (de la más fácil a la más difícil)
export const porDificultad: Comparador = (a, b) =>
    // busco el número de cada dificultad en la tabla y los resto
    ORDEN_DIFICULTAD[a.dificultad] - ORDEN_DIFICULTAD[b.dificultad];

// Recibe un comparador y devuelve otro con el orden al revés (para orden descendente)
export const invertir = (comparador: Comparador): Comparador =>
    // devuelve una función nueva que llama al comparador original con a y b intercambiados
    (a, b) => comparador(b, a);

// Ordena una lista usando el comparador que le pasen, sin tocar la lista original
export const ordenarTareas = (
    tareas: readonly Tarea[],   // la lista de entrada, "readonly" = no se puede modificar
    comparador: Comparador      // el criterio de orden (porTitulo, porDificultad, etc.)
): readonly Tarea[] =>          // devuelve otra lista de solo lectura
    // [...tareas] hace una COPIA, porque sort modifica el array sobre el que se llama
    // sort(comparador) reordena esa copia usando el criterio elegido
    [...tareas].sort(comparador);
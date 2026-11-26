import { randomUUID } from "node:crypto"; // Trae la función que genera UUIDs (único punto impuro del módulo)
import type { DatosTarea, CambiosTarea } from "../dominio/Tipos.js"; // Solo tipo: desaparece al compilar. Ojo: el nombre del archivo debe coincidir con el real (tipos / Tipos)
import { Tarea } from "../dominio/Tarea.js"; // Import normal: la clase se usa con "new" en ejecución
import { pipe } from "./composicion.js";
import { ordenarTareas,Comparador } from "./Ordenamiento.js";


// Lo que devuelve agregarTarea: dos cosas juntas en un objeto
export interface ResultadoAgregar {
    tareaCreada: Tarea; // La tarea nueva (el menú muestra su id)
    listaActualizada: readonly Tarea[]; // La lista nueva, de solo lectura
}


// Función flecha exportada; nombre en camelCase y con verbo de acción
export const agregarTarea = (
    tareas: readonly Tarea[], // Lista actual: "readonly" promete no mutarla
    datos: Omit<DatosTarea, "id">, // Datos del usuario: DatosTarea sin id
    ahora: Date // Fecha inyectada: así el constructor no llama a new Date()
): ResultadoAgregar => {
    const id = randomUUID(); // Único punto impuro: genera el id acá (capa de negocio)
    const tareaCreada = new Tarea({
        ...datos, // Copia los datos recibidos
        id, // Agrega el id generado
        creacion: ahora, // Fecha de creación recibida
        ultimaEdicion: ahora // Al crearla, coincide con la creación
    });
    return {
        tareaCreada, // Forma corta de tareaCreada: tareaCreada
        listaActualizada: [...tareas, tareaCreada] // Array NUEVO: copia y suma la nueva (sin push)
    };
};

export const eliminarTarea = (
    tareas: readonly Tarea[], // Lista de solo lectura
    id: string, // Id de la tarea a eliminar
    ahora: Date // Fecha inyectada: mantiene la función pura
): readonly Tarea[] => // Misma inmutabilidad en entrada y salida
    tareas.map(tarea => // map devuelve una lista nueva de la misma longitud
        tarea.id === id // ¿Es la tarea buscada?
            ? tarea.marcarEliminada(ahora) // Sí: copia marcada como eliminada
            : tarea // No: se conserva igual (misma referencia)
    );

export const editarTarea = (
    tareas: readonly Tarea[], // Lista de solo lectura
    id: string, // Id de la tarea a editar
    cambios: CambiosTarea, // Cambios parciales
    ahora: Date // Fecha inyectada: mantiene la función pura
): readonly Tarea[] =>
    tareas.map(tarea => // Lista nueva de la misma longitud
        tarea.id === id // ¿Es la tarea buscada?
            ? tarea.actualizar(cambios, ahora) // Sí: la propia Tarea decide cómo aplicar los cambios
            : tarea // No: se conserva igual
    );

export const filtrarActivas = (
    tareas: readonly Tarea[] // Lista de solo lectura: promete no mutarla
): readonly Tarea[] => // Devuelve otra lista de solo lectura, misma inmutabilidad que la entrada
    tareas.filter( // filter recorre la lista y devuelve una NUEVA con solo los elementos que dan true
        tarea => tarea.estaActiva() // Para cada tarea pregunta "¿estás activa?": true = se queda, false = se descarta
    );

// Devuelve las tareas listas para mostrar: primero saco las eliminadas, después ordeno
export const obtenerTareasParaMostrar = (
    tareas: readonly Tarea[],            // todas las tareas, incluidas las eliminadas
    comparador: Comparador               // el criterio de orden (porTitulo, porDificultad...)
): readonly Tarea[] =>
    pipe(
        tareas,                          // con qué arranco: todas las tareas
        filtrarActivas,                  // máquina 1: saca las eliminadas
        lista => ordenarTareas(lista, comparador) // máquina 2: ordena lo que quedó
    );


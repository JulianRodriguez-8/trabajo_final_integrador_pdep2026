import type { Tarea } from "../dominio/Tarea.js";
import type { EstadoTarea, DificultadTarea } from "../dominio/Tipos.js";

export interface ItemEstadistica {
    categoria: string;
    cantidad: number;
    porcentaje: number;
}

const ESTADOS: readonly EstadoTarea[] = ["Pendiente", "En curso", "Terminada", "Cancelada"];
const DIFICULTADES: readonly DificultadTarea[] = ["Fácil", "Media", "Difícil"];

export const totalTareas = (tareas: readonly Tarea[]): number => tareas.length;

const calcularPorcentaje = (cantidad: number, total: number): number =>
    total === 0 ? 0 : (cantidad / total) * 100;

const estadisticasPor = (
    tareas: readonly Tarea[],
    categorias: readonly string[],
    propiedad: "estado" | "dificultad"
): readonly ItemEstadistica[] =>
    categorias.map(categoria => {
        const cantidad = tareas.filter(tarea => tarea[propiedad] === categoria).length;
        return { categoria, cantidad, porcentaje: calcularPorcentaje(cantidad, tareas.length) };
    });

export const estadisticasPorEstado = (tareas: readonly Tarea[]): readonly ItemEstadistica[] =>
    estadisticasPor(tareas, ESTADOS, "estado");

export const estadisticasPorDificultad = (tareas: readonly Tarea[]): readonly ItemEstadistica[] =>
    estadisticasPor(tareas, DIFICULTADES, "dificultad");
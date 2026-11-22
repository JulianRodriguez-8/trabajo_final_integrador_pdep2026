import { randomUUID } from "node:crypto";

export type EstadoTarea = "Pendiente" | "En curso" | "Terminada" | "Cancelada";
export type DificultadTarea = "Fácil" | "Media" | "Difícil";

export interface DatosTarea {
   
    titulo: string;
    descripcion?: string | null;
    estado?: EstadoTarea;
    vencimiento?: string | null;
    dificultad?: DificultadTarea;
    creacion?: Date;
    ultimaEdicion?: Date;
    eliminada?: boolean;
}

export class Tarea {
    readonly id: string;
    readonly titulo: string;
    readonly descripcion: string | null;
    readonly estado: EstadoTarea;
    readonly vencimiento: string | null;
    readonly dificultad: DificultadTarea;
    readonly creacion: Date;
    readonly ultimaEdicion: Date;
    readonly eliminada: boolean;

    constructor(datos: DatosTarea) {
        // Genera un UUID automáticamente si no se recibe uno (útil al reconstruir desde JSON)
        this.id =  randomUUID();
        this.titulo = datos.titulo;
        this.descripcion = datos.descripcion ?? null;
        this.estado = datos.estado ?? "Pendiente";
        this.vencimiento = datos.vencimiento ?? null;
        this.dificultad = datos.dificultad ?? "Fácil";
        this.creacion = datos.creacion ?? new Date();
        this.ultimaEdicion = datos.ultimaEdicion ?? new Date();
        this.eliminada = datos.eliminada ?? false;
    }

    // Devuelve una nueva instancia marcada como eliminada sin mutar la original
    marcarEliminada(): Tarea {
        if (this.eliminada) {
            return this;
        }
        return new Tarea({
            ...this,
            ultimaEdicion: new Date(),
            eliminada: true
        });
    }

    // Devuelve una nueva instancia con los campos actualizados sin mutar la original
    actualizar(cambios: Partial<Pick<DatosTarea, "titulo" | "descripcion" | "estado" | "vencimiento" | "dificultad">>): Tarea {
        if (this.eliminada) {
            return this;
        }
        return new Tarea({
            ...this,
            ...cambios,
            ultimaEdicion: new Date()
        });
    }

    estaActiva(): boolean {
        return !this.eliminada;
    }
}
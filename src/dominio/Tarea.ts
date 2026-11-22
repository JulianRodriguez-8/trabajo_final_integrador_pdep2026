import { randomUUID } from "node:crypto"; // Importa randomUUID del módulo nativo crypto de Node para generar IDs únicos

export type EstadoTarea = "Pendiente" | "En curso" | "Terminada" | "Cancelada"; // Define los únicos valores permitidos para el estado
export type DificultadTarea = "Fácil" | "Media" | "Difícil"; // Define los únicos valores permitidos para la dificultad

export interface DatosTarea { // Contrato de tipos para los datos que se pasan al crear una tarea
    titulo: string; // Título obligatorio de tipo string
    descripcion?: string | null; // Descripción opcional; puede ser string o null
    estado?: EstadoTarea; // Estado opcional; si viene, debe ser uno de EstadoTarea
    vencimiento?: string | null; // Vencimiento opcional; puede ser string o null
    dificultad?: DificultadTarea; // Dificultad opcional; si viene, debe ser una de DificultadTarea
    creacion?: Date; // Fecha de creación opcional de tipo Date
    ultimaEdicion?: Date; // Fecha de última edición opcional de tipo Date
    eliminada?: boolean; // Bandera opcional para eliminación lógica (soft delete)
}

export class Tarea { // Declara la clase Tarea en POO basada en clases
    readonly id: string; // ID único (UUID); readonly evita reasignarlo desde afuera
    readonly titulo: string; // Título de la tarea (solo lectura)
    readonly descripcion: string | null; // Descripción o null (solo lectura)
    readonly estado: EstadoTarea; // Estado actual de la tarea (solo lectura)
    readonly vencimiento: string | null; // Fecha/texto de vencimiento o null (solo lectura)
    readonly dificultad: DificultadTarea; // Dificultad de la tarea (solo lectura)
    readonly creacion: Date; // Momento en que se creó la tarea (solo lectura)
    readonly ultimaEdicion: Date; // Momento del último cambio (solo lectura)
    readonly eliminada: boolean; // true si está dada de baja lógicamente, false si está activa

    constructor(datos: DatosTarea) { // Se ejecuta al hacer new Tarea(datos)
        this.id = randomUUID(); // Genera un UUID nuevo automáticamente en cada instancia creada
        this.titulo = datos.titulo; // Asigna el título recibido
        this.descripcion = datos.descripcion ?? null; // Si datos.descripcion es null/undefined, usa null
        this.estado = datos.estado ?? "Pendiente"; // Si no viene estado, usa "Pendiente" por defecto
        this.vencimiento = datos.vencimiento ?? null; // Si no viene vencimiento, usa null
        this.dificultad = datos.dificultad ?? "Fácil"; // Si no viene dificultad, usa "Fácil"
        this.creacion = datos.creacion ?? new Date(); // Si no viene creacion, toma la fecha/hora actual
        this.ultimaEdicion = datos.ultimaEdicion ?? new Date(); // Si no viene ultimaEdicion, toma la fecha/hora actual
        this.eliminada = datos.eliminada ?? false; // Si no viene eliminada, empieza en false (activa)
    }

    marcarEliminada(): Tarea { // Método que devuelve una Tarea marcada como eliminada sin mutar esta
        if (this.eliminada) { // Si ya estaba eliminada lógicamente
            return this; // Devuelve esta misma instancia y no hace nada más
        }
        return new Tarea({ // Crea y devuelve una NUEVA instancia de Tarea
            ...this, // Copia todas las propiedades de la instancia actual
            ultimaEdicion: new Date(), // Sobrescribe ultimaEdicion con la fecha actual
            eliminada: true // Sobrescribe eliminada a true (baja lógica)
        });
    }

    actualizar(cambios: Partial<Pick<DatosTarea, "titulo" | "descripcion" | "estado" | "vencimiento" | "dificultad">>): Tarea { // Recibe cambios parciales de esos 5 campos y devuelve una Tarea
        if (this.eliminada) { // Si la tarea ya fue eliminada lógicamente
            return this; // No permite editarla y devuelve la misma instancia
        }
        return new Tarea({ // Crea y devuelve una NUEVA instancia de Tarea con los cambios aplicados
            ...this, // Copia los valores actuales de esta tarea
            ...cambios, // Piso solo los campos que vinieron en "cambios"
            ultimaEdicion: new Date() // Actualiza la fecha de última edición al momento actual
        });
    }

    estaActiva(): boolean { // Método de consulta que indica si la tarea no está eliminada
        return !this.eliminada; // Devuelve true si eliminada es false; false si eliminada es true
    }
}
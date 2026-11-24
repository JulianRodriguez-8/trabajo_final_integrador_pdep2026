import type { DatosTarea, EstadoTarea, DificultadTarea,CambiosTarea} from "./Tipos.js"; // (corregido) Importa solo tipos desde tipos.ts; ya no se importa randomUUID

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
        this.id = datos.id; // (corregido) Conserva el id recibido; no genera ninguno
        this.titulo = datos.titulo; // Asigna el título recibido
        this.descripcion = datos.descripcion ?? null; // Si datos.descripcion es null/undefined, usa null
        this.estado = datos.estado ?? "Pendiente"; // Si no viene estado, usa "Pendiente" por defecto
        this.vencimiento = datos.vencimiento ?? null; // Si no viene vencimiento, usa null
        this.dificultad = datos.dificultad ?? "Fácil"; // Si no viene dificultad, usa "Fácil"
        this.creacion = datos.creacion ?? new Date(); // Si no viene creacion, toma la fecha/hora actual
        this.ultimaEdicion = datos.ultimaEdicion ?? new Date(); // Si no viene ultimaEdicion, toma la fecha/hora actual
        this.eliminada = datos.eliminada ?? false; // Si no viene eliminada, empieza en false (activa)
    }

       marcarEliminada(ahora: Date): Tarea { // Recibe la fecha actual desde afuera: ya no depende del reloj del sistema
        if (this.eliminada) { // Si ya estaba eliminada lógicamente
            return this; // Devuelve la misma instancia (esto hace la operación idempotente)
        }
        return new Tarea({ // Crea una NUEVA instancia, sin mutar esta
            ...this, // Copia todas las propiedades actuales (incluido el id)
            ultimaEdicion: ahora, // Usa la fecha recibida en lugar de new Date(): mismo input, mismo resultado
            eliminada: true // Baja lógica (soft delete)
        });
    }

  actualizar(
        cambios: CambiosTarea, // Tipo con nombre: una sola fuente de verdad (antes era Partial<Pick<...>> inline)
        ahora: Date // Fecha inyectada por quien llama
    ): Tarea {
        if (this.eliminada) { // Una tarea eliminada no se edita
            return this; // Devuelve la misma instancia
        }
        return new Tarea({
            ...this, // Conserva valores actuales (incluido el id)
            ...cambios, // Pisa solo los campos recibidos
            ultimaEdicion: ahora // Fecha inyectada
        });
    }
}
export type EstadoTarea = "Pendiente" | "En curso" | "Terminada" | "Cancelada"; // Define los únicos valores permitidos para el estado
export type DificultadTarea = "Fácil" | "Media" | "Difícil"; // Define los únicos valores permitidos para la dificultad
/** Campos que se pueden modificar al editar una tarea (todos opcionales). */
export type CambiosTarea = Partial<
    Pick<DatosTarea, "titulo" | "descripcion" | "estado" | "vencimiento" | "dificultad">
>;
export interface DatosTarea { // Contrato de tipos para los datos que se pasan al crear una tarea
    id: string; // (corregido) ID único ya resuelto por quien crea la tarea (capa de negocio)el uuid se asigna cuando creo la tarea en el nuevatarea
    titulo: string; // Título obligatorio de tipo string
    descripcion?: string | null; // Descripción opcional; puede ser string o null
    estado?: EstadoTarea; // Estado opcional; si viene, debe ser uno de EstadoTarea
    vencimiento?: string | null; // Vencimiento opcional; puede ser string o null
    dificultad?: DificultadTarea; // Dificultad opcional; si viene, debe ser una de DificultadTarea
    creacion?: Date; // Fecha de creación opcional de tipo Date
    ultimaEdicion?: Date; // Fecha de última edición opcional de tipo Date
    eliminada?: boolean; // Bandera opcional para eliminación lógica (soft delete)
}
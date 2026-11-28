// Importo el molde del que voy a heredar
import { Dificultad } from "./Dificultad.js";

// Dificil hereda de Dificultad, igual que las otras dos
export class Dificil extends Dificultad {
    readonly nombre = "Difícil"; // su nombre (con tilde, igual que el tipo DificultadTarea)
    readonly peso = 3;           // pesa 3: la más pesada
}
// Importo el molde del que voy a heredar
import { Dificultad } from "./Dificultad.js";

// Media también hereda de Dificultad: mismo molde, distintos valores
export class Media extends Dificultad {
    readonly nombre = "Media";   // su nombre
    readonly peso = 2;           // pesa 2: queda en el medio
}
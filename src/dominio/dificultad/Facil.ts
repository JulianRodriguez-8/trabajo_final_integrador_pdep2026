// Importo el molde del que voy a heredar (con .js al final, como en el resto del proyecto)
import { Dificultad } from "./Dificultad.js";

// "extends" = Facil HEREDA de Dificultad: ya tiene el método comparar sin escribirlo
export class Facil extends Dificultad {
    readonly nombre = "Fácil";   // completo lo que el molde exige: cómo se llama
    readonly peso = 1;           // completo lo que el molde exige: pesa 1 (la más liviana)
}
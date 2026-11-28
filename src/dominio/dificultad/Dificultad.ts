// "abstract class" = un molde que NO se puede usar con "new" directamente
// Solo sirve para que las clases hijas (Facil, Media, Dificil) hereden de él
export abstract class Dificultad {

    // "abstract" = el molde NO da el valor, OBLIGA a cada hija a darlo
    // Si una hija no define "nombre", TypeScript marca error
    abstract readonly nombre: string;   // el texto que se muestra y se guarda: "Fácil", "Media" o "Difícil"

    // Lo mismo con el peso: cada hija dice cuánto pesa
    abstract readonly peso: number;     // número para poder comparar: 1 = más fácil, 3 = más difícil

    // Método COMPARTIDO: se escribe una sola vez acá y las tres hijas lo heredan
    // "otra" es la dificultad contra la que me comparo
    comparar(otra: Dificultad): number {
        // this.peso = el peso de "esta" dificultad (la que llama al método)
        // otra.peso = el peso de la otra
        // La resta da negativo si yo pesa menos, positivo si pesa más, 0 si empatan (lo que necesita sort)
        return this.peso - otra.peso;
    }
}
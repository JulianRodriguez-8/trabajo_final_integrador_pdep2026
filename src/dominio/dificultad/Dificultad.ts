// Molde común de todas las dificultades
export abstract class Dificultad {
    abstract readonly nombre: string;   // cada hija dice cómo se llama
    abstract readonly peso: number;     // cada hija dice cuánto pesa

    // Método compartido (lo heredan todas sin reescribirlo)
    // pista: ¿cómo comparás el peso de "esta" con el de "otra"?
    comparar(otra: Dificultad): number {
        /* ... */
    }
}
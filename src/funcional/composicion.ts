



// pipe agarra un valor y una lista de funciones, y se las aplica de a una, en orden
// <T> es un "tipo comodín": significa "el tipo que sea, pero el mismo al entrar y al salir"
export const pipe = <T>(
    valor: T,                          // el valor con el que arranco (en nuestro caso, la lista de tareas)
    ...funciones: Array<(x: T) => T>   // los "..." juntan todas las funciones que le pasen en una lista
): T =>                                // devuelve el resultado final, del mismo tipo que el valor inicial
    funciones.reduce(                  // reduce recorre las funciones de a una
        (acumulado, funcion) => funcion(acumulado), // le aplico la función actual al resultado que llevo hasta ahora
        valor                          // el resultado "que llevo" arranca siendo el valor original
    );
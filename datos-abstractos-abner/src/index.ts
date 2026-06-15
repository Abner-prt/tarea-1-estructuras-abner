// Tipos de Datos Abstractos (TDAs)
// Estructuras de Datos - Unidad 1
// Abner Edgardo Hernandez Portillo -- 20232001033

// Un TDA define QUÉ hace una estructura, no CÓMO lo hace por dentro.
// Con interfaces y genéricos en TS podemos expresar eso de forma clara.


//Procedimiento solicitado en la pauta:  

// Interfaces 

interface IContenedor<T> {
  agregar(elemento: T): void;
  eliminar(): T | undefined;
  obtener(): T | undefined;
  estaVacia(): boolean;
  tamanio(): number;
}

// Para comparar objetos entre sí. Retorna negativo, 0 o positivo
interface IComparable<T> {
  comparar(otro: T): number;
}



// Agrupa dos valores de tipos distintos sin necesidad de una clase completa.
type Par<A, B> = {
  primero: A;
  segundo: B;
};



// El nodo es la pieza base de una lista enlazada.
// Guarda un dato y sabe quién está antes y después de él.
class NodoDoblementeEnlazado<T> {
  public dato: T;
  public siguiente: NodoDoblementeEnlazado<T> | null;
  public anterior: NodoDoblementeEnlazado<T> | null;

  constructor(dato: T) {
    this.dato = dato;
    this.siguiente = null;
    this.anterior = null;
  }

  // Muestra el nodo junto a sus siguientes
  toString(): string {
    const anteriorStr = this.anterior !== null ? `[${String(this.anterior.dato)}]` : "null";
    const siguienteStr = this.siguiente !== null ? `[${String(this.siguiente.dato)}]` : "null";
    return `${anteriorStr} <-> [${String(this.dato)}] <-> ${siguienteStr}`;
  }
}


// ListaArreglo<T> implementa IContenedor<T>

class ListaArreglo<T> implements IContenedor<T> {
  public elementos: T[] = [];

  agregar(elemento: T): void {
    this.elementos.push(elemento); // O(1)
  }

  eliminar(): T | undefined {
    return this.elementos.pop(); // O(1), saca el último
  }

  obtener(): T | undefined {
    return this.elementos[this.elementos.length - 1]; // O(1), solo mira
  }

  estaVacia(): boolean {
    return this.elementos.length === 0;
  }

  tamanio(): number {
    return this.elementos.length;
  }

  listar(): T[] {
    return [...this.elementos];
  }
}

// Ejemplo de clase concreta que implementa una interfaz genérica.
// Compara estudiantes por nota.
class Estudiante implements IComparable<Estudiante> {
  constructor(public nombre: string, public nota: number) {}

  comparar(otro: Estudiante): number {
    return this.nota - otro.nota;
  }

  toString(): string {
    return `${this.nombre} (nota: ${this.nota})`;
  }
}



console.log("=".repeat(60));
console.log("=".repeat(60));

//  Par<A, B>
console.log("\n--- Par<A, B> ---");
const parEjemplo: Par<string, number> = { primero: "Edad", segundo: 25 };
console.log(`Par<string, number>: { primero: "${parEjemplo.primero}", segundo: ${parEjemplo.segundo} }`);

const parMixto: Par<number, boolean> = { primero: 42, segundo: true };
console.log(`Par<number, boolean>: { primero: ${parMixto.primero}, segundo: ${parMixto.segundo} }`);

// Nodos enlazados
console.log("\n---  NodoDoblementeEnlazado<T> ---");
const nodo1 = new NodoDoblementeEnlazado<number>(10);
const nodo2 = new NodoDoblementeEnlazado<number>(20);
const nodo3 = new NodoDoblementeEnlazado<number>(30);

// Se enlazan manualmente: nodo1, nodo2 y nodo3
nodo1.siguiente = nodo2;
nodo2.anterior = nodo1;
nodo2.siguiente = nodo3;
nodo3.anterior = nodo2;

console.log(`nodo1.toString(): ${nodo1.toString()}`);
console.log(`nodo2.toString(): ${nodo2.toString()}`);
console.log(`nodo3.toString(): ${nodo3.toString()}`);

//   ListaArreglo<T>
console.log("\n---  ListaArreglo<T> implements IContenedor<T> ---");
const lista = new ListaArreglo<number>();

console.log(`estaVacia(): ${lista.estaVacia()}`);
lista.agregar(10);
lista.agregar(20);
lista.agregar(30);
console.log(`Después de agregar 10, 20, 30:`);
console.log(`  tamanio(): ${lista.tamanio()}`);
console.log(`  obtener(): ${lista.obtener()}`);
console.log(`  listar(): [${lista.listar().join(", ")}]`);
console.log(`  eliminar(): ${lista.eliminar()}`);
console.log(`  tamanio() después: ${lista.tamanio()}`);

//  IComparable<T> con Estudiante
console.log("\n---  IComparable<T> con clase Estudiante ---");
const est1 = new Estudiante("Abner", 90);
const est2 = new Estudiante("Calanoglu", 85);
const est3 = new Estudiante("Jose", 90);

console.log(`est1.comparar(est2): ${est1.comparar(est2)} (positivo = Abner > Calanoglu)`);
console.log(`est2.comparar(est1): ${est2.comparar(est1)} (negativo = Calanoglu < Abner)`);
console.log(`est1.comparar(est3): ${est1.comparar(est3)} (cero = misma nota)`);

//  Lista de estudiantes
console.log("\n---  ListaArreglo<Estudiante> ---");
const listaEstudiantes = new ListaArreglo<Estudiante>();
listaEstudiantes.agregar(est1);
listaEstudiantes.agregar(est2);
listaEstudiantes.agregar(est3);

console.log(`Estudiantes (${listaEstudiantes.tamanio()}):`);
for (const est of listaEstudiantes.listar()) {
  console.log(`  - ${est.toString()}`);
}

console.log("\n" + "=".repeat(60));
console.log("=".repeat(60));

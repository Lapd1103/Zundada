class Pila<T> {

  private top: number;

  private arr: T[];

  public constructor(n: number) {
    this.top = 0;
    this.arr = new Array<T>(n);
  }

  //Inserción de un solo dato, final de la pila
  public push(valor: T) {
    if (this.full()) {
      throw "La fila esta llena";
    }

    this.arr[this.top] = valor;
    this.top++;
  }

  //Actualización de un solo dato, ultimo de la pila
  public update(valor: T) {
    this.arr[this.top - 1] = valor;
  }

  //Consulta de un solo dato, ultimo de la pila
  public peek(): T {
    return this.arr[this.top - 1];
  }

  //Eliminacion de un solo dato, ultimo de la pila
  public pop(): T {
    if (this.empty()) {
      throw "La fila esta vacia";
    }

    this.top--;
    return this.arr[this.top];
  }

  //Encuentra la posicion dentro del array de un elemento T
  public find(objeto: T): number | null {
    let i = 0;
    while (this.arr[i] != objeto && i < this.top) {
      i++;
    }
    if (this.peek() != objeto && i == this.top) {
      return null;
    }
    else {
      return i;
    }
  }

  //Elimina cualquier objeto dentro del array 
  public delete(objeto: T) {
    let i = this.find(objeto);

    if (i != null) {
      for (let j = i; j < this.top; j++) {
        this.arr[j] = this.arr[j + 1];
      }
      this.top--;
    }
  }

  //Actualiza cualquier objeto dentro del array
  public updAny(objeto: T, nuevoValor: T) {
    let i = this.find(objeto);
    if (i != null) {
      this.arr[i] = nuevoValor;
    }
  }

  public empty(): boolean {
    return (this.top <= 0);
  }

  public full(): boolean {
    return (this.top >= this.arr.length);
  }

  public getTop(): number {
    return this.top;
  }

  public setTop(top: number) {
    this.top = top;
  }

  //Consulta de todos los elementos de la pila
  public getArray(): T[] {
    return this.arr;
  }

  public setArray(array: T[]) {
    this.arr = array;
  }
}

export default Pila;






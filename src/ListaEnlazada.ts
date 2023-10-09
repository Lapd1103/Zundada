class Nodo<T>{
  private data: T;
  private next: Nodo<T> | null;

  public constructor(data: T) {
    this.data = data;
    this.next = null;
  }

  public getData(): T {
    return this.data;
  }

  public setData(data: T) {
    this.data = data;
  }

  public getNext(): Nodo<T> | null {
    return this.next;
  }

  public setNext(next: Nodo<T> | null) {
    this.next = next;
  }

}

class ListaEnlazada<T>{
  private head: Nodo<T> | null;
  private tail: Nodo<T> | null;

  public constructor() {
    this.head = null;
    this.tail = null;
  }

  //Añade un objeto al principio de la lista
  public pushFront(data: T) {
    let node = new Nodo(data);
    node.setNext(this.head);
    this.head = node;

    if (this.tail == null) {
      this.tail = this.head;
    }
  }

  //Consulta el dato que se encuentre en la cabeza de la fila
  public getHead(): T | null {
    if (this.head != null) {
      return this.head.getData();
    } else { return null }
  }

  //Consulta el dato que se encuentre en la cola de la fila
  public getTail(): T | null {
    if (this.tail != null) {
      return this.tail.getData();
    } else { return null }
  }

  //Elimina y consulta el objeto al principio de la lista
  public popFront(): T {
    if (this.head == null) {
      throw "Lista vacia";
    }
    let datoFront: T = this.head.getData();

    this.head = this.head.getNext();
    if (this.head == null) {
      this.tail = null;
    }

    return datoFront;
  }

  //Añade un objeto al final de la lista
  public pushBack(data: T) {
    let node = new Nodo(data);

    if (this.tail == null) {
      this.head = this.tail = node;
    } else {
      this.tail.setNext(node);
      this.tail = node;
    }
  }

  //encuentra el elemento especifico de la lista
  public find(data: T): Nodo<T> | null {
    let p = this.head;
    let i = 0;

    while (p?.getNext()?.getData() != data && p?.getNext()?.getNext != null) {
      i++;
      p = p.getNext();
    }
    if (this.tail?.getData() != data && p.getNext() == null) {
      return null;
    } else {
      return p;
    } //Retorna el nodo anterior al elemento que estoy buscando
  }


  //Elimina el elemento de cualquier posicion de la lista
  public erase(data: T) {
    if (this.head?.getData() == data) {
      this.popFront();
    } else {
      let i = this.find(data);

      if (i != null) {
        i.setNext(i.getNext().getNext());
      }
    }

  }

  //Actualiza un  elemento de cualquier posicion de la lista
  public update(data: T, dNuevo: T) {
    if (this.head?.getData() == data) {
      this.head.setData(dNuevo);
    } else {
      let i = this.find(data);
      if (i != null) {
        i.getNext().setData(dNuevo);
      }
    }

  }

  public searchAll() {
    let h = this.head;
    while (h != null) {
      console.log(h.getData());
      h = h.getNext();
    }
  }
}

export default ListaEnlazada;
const pool = require('../database');

module.exports = class Pila {
  
    constructor(n) {
      this.top = 0;
      this.arr = new Array(n);
    }
  
    //Inserción de un solo dato, final de la pila
    push(valor) {
      if (this.full()) {
        throw "La fila esta llena";
      }
  
      this.arr[this.top] = valor;
      this.top++;
    }
  
    //Actualización de cualquier elemento dentro de la pila
    update(id,valor) {
      let idM = this.find(id);

      this.arr[idM] = valor;
    }

    //Elimina cualquier objeto dentro del array 
    delete(id) {
      let idM = this.find(id);

      for (let i = idM; i < this.top; i++) {
        this.arr[i] = this.arr[i + 1];
      }
      this.top--;
    }

    //Consulta de un solo dato, ultimo de la pila
    peek() {
      return this.arr[this.top - 1];
    }
  
    //Eliminacion de un solo dato, ultimo de la pila
    pop() {
      if (this.empty()) {
        throw "La fila esta vacia";
      }
  
      this.top--;
      return this.arr[this.top];
    }
  
    //Encuentra la posicion dentro del array de un elemento
    find(objeto) {
      let i = 0;
      while (this.arr[i].idEvento != objeto && i < this.top) {
        i++;
      }
      if (this.peek().idEvento != objeto && i == this.top) {
        return null;
      }
      else {
        return i;
      }
    }
  
    //Actualiza cualquier objeto dentro del array
    updAny(objeto, nuevoValor) {
      let i = this.find(objeto);
      if (i != null) {
        this.arr[i] = nuevoValor;
      }
    }

    async loadData(tabla) {
        const datos = await pool.query("SELECT * FROM "+tabla+"");
        for(var i = 0; i<datos.length; i++){
            this.push(datos[i]);
        }
    }

    async updateDB(tabla){
      await pool.query('DELETE FROM '+tabla+'');
      for(let i = 0; i<this.top; i++){
        const evento = this.arr[i];
        
        await pool.query('INSERT INTO '+tabla+' SET ?', [ evento ]);
      }
    }
    
    empty() {
      return (this.top <= 0);
    }
  
    full() {
      return (this.top >= this.arr.length);
    }
  
    getTop() {
      return this.top;
    }
  
    setTop(top) {
      this.top = top;
    }
  
    //Consulta de todos los elementos de la pila
    getArray() {
        let newArray = new Array(this.arr.length); 
        let arrayOr = this.arr;
        let limit = this.top;
        for(let i = 0; i<limit; i++){
          newArray[i] = this.pop();
        }
        this.setTop(limit);
        this.setArray(arrayOr);
      return newArray;
    }
    
    getArr() {
      return this.arr;
    }

    setArray(array) {
      this.arr = array;
    }
    getIndice(id) {
      return this.arr[id];
    }
  }
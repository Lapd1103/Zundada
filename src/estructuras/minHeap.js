const pool = require('../database');
const Evento = require('../clases/evento');

module.exports = class MinHeap {
  
    constructor(n){
      this.array = new Array(n);
      this.maxSize = n;
      this.size = 0;    
    }

    async loadData() {
        
      const datos = await pool.query("SELECT * FROM evento");
      this.size = 0;

      for(var i = 0; i<datos.length; i++){
        let item = datos[i];

        let evento = new Evento(item.idEvento, item.nombre, item.lugar, item.fecha, item.hora, item.numeroboletas, item.Bdisponibles);
        this.insert(evento);
      }
    }

    getData(){
      let arrayAux = new Array(this.maxSize);
      let sizeAct = this.size;

      for(let i = 0; i < sizeAct; i++){  
        arrayAux[i] = this.extractMin();
      }
      return arrayAux;
    }
  
    parent(i){
      return Math.floor(i/2);
    }
  
    leftChild(i){
      return 2*i;
    }
  
    rightChild(i){
      return 2*i+1;
    }
  
    siftUp(i){
      while(i > 1 && this.array[this.parent(i)].getBdisponibles() > this.array[i].getBdisponibles()){//Revisar
        let aux = this.array[i];
        this.array[i] = this.array[this.parent(i)];
        this.array[this.parent(i)] = aux;
        i = this.parent(i);
      }
    }
  
    siftDown(i){
      let maxIndex = i;
  
      let l = this.leftChild(i);
      if(l<= this.size && this.array[l].getBdisponibles() < this.array[maxIndex].getBdisponibles()){
        maxIndex = l;
      }
  
      let r = this.rightChild(i);
      if(r<= this.size && this.array[r].getBdisponibles() < this.array[maxIndex].getBdisponibles()){
        maxIndex = r;
      }
  
      if(i != maxIndex){
        let aux = this.array[i];
        this.array[i] = this.array[maxIndex];
        this.array[maxIndex] = aux;
        this.siftDown(maxIndex);
      }
    }
  
    insert(dato){
      if(this.size == this.maxSize){
        throw new RuntimeException("El monticulo esta lleno");  
      }
      else{
        this.size++;
        this.array[this.size] = dato;
        this.siftUp(this.size); 
      }
    }
  
    extractMin(){
      let minimo = this.array[1];
      this.array[1] = this.array[this.size];
      this.size--;
      this.siftDown(1);
      return minimo;
    }
  
    getMin(){
      return this.array[1];
    }
  
    getArray(){
      return this.array;
    }
  
    getSize(){
      return this.size;
    }
  }
const pool = require('../database');
const Evento = require('../clases/evento');

module.exports = class BinarySearchTree{
  
  constructor(){
    let eventRoot = new Evento(null, 'algo', null, null, null, null, null);
    let root = new Node(eventRoot);
    this.root = root;
  }

  async loadData() {
        
    const datos = await pool.query("SELECT * FROM evento");
    console.log('Datos DB');
    console.log(datos);
    for(var i = 0; i<datos.length; i++){
      let item = datos[i];

      let evento = new Evento(item.idEvento, item.nombre, item.lugar, item.fecha, item.hora, item.numeroboletas, item.Bdisponibles);
      console.log('iteración '+ i);
      console.log(evento);
      this.insert(evento);
    }
  }

  find(key, root){
    if(root.getKey().getNombre() == key.getNombre()){
      return root;
    }else if(root.getKey().getNombre() > key.getNombre()){
      if(root.getLeftChild() != null){
        return find(key, root.getLeftChild());
      }else{
        return root;
      }
    }else{
      if(root.getRightChild() != null){
        return find(key, root.getRightChild());
      }else{
        return root;
      }
    }
  }

  next(node){
    if(node.getRightChild() != null){
      return leftDescendant(node.getRightChild());
    }else{
      return rightAncestor(node);
    }
  }

  insert(key, root){
    let p = this.find(key, root);
    // Crea nuevo nodo con el valor y padre encontrado
    let nuevoNodo = new Node(key, p);
    if(key <= p.getKey()){ //Los elementos iguales al padre se almacenaran como hijos izquierdos para este arbol
      p.setLeftChild(nuevoNodo);
    }else{
      p.setRightChild(nuevoNodo);
    }
  }

  leftDescendant(node){
    if(node.getLeftChild() == null){
      return node;
    }else{
      return leftDescendant(node.getLeftChild());
    }
  }

  rightAncestor(node){
    if(node.getKey() < node.getParent().getKey()){
      return node.getParent();
    }else{
      return rightAncestor(node.getParent());
    }
  }

  getRoot(){
    return this.root;
  }

}

class Node{

  constructor(key, parent){
    this.key = key;
    this.parent = parent;
    this.leftChild = null;
    this.rightChild = null;
  }

  getKey(){
    return this.key;
  }

  setKey(key){
    this.key = key;
  }

  getParent(){
    return this.parent;
  }

  setParent(parent){
    this.parent = parent;
  }

  getLeftChild(){
    return this.leftChild;
  }

  setLeftChild(leftChild){
    this.leftChild = leftChild;
  }

  getRightChild(){
    return this.rightChild;
  }

  setRightChild(rightChild){
    this.rightChild = rightChild;
  }
}

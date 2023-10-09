import Evento from "./Evento";
import Pila from "./Pila";
import ListaEnlazada from "./ListaEnlazada";

const n = 10000000;       //Numero de eventos a testear
let pilaEventos = new Pila<Evento>(n);
let listaEventos = new ListaEnlazada<Evento>();

let datoEliminar;

console.log("cantidad datos: "+n)
for(let i=0; i<n;i++){
    let evento = new Evento(i,"Bogotá","31/10/2023",50+i);
    listaEventos.pushFront(evento);
    if(i == n/2){
        datoEliminar = evento;
    }
}

console.time('Tiempo eliminación');
listaEventos.erase(datoEliminar);
console.timeEnd('Tiempo eliminación');

/*for(let i=0; i<n;i++){
    listaEventos.pushFront(i);
}


console.time('Tiempo eliminacion:');
listaEventos.erase(n/2);
console.timeEnd('Tiempo eliminacion:');*/

/*for(let i=0; i<n-1;i++){
    console.log(listaEventos.popFront());
}*/

/*console.log("cantidad datos: "+n)
for(let i=0; i<n;i++){
    let evento = new Evento(i,"Bogotá","31/10/2023",50+i);
    pilaEventos.push(evento);
    if(i == n/2){
        datoEliminar = evento;
    }
}

console.time('Tiempo eliminación');
pilaEventos.delete(datoEliminar);
console.timeEnd('Tiempo eliminación');*/

/*for(let i=0; i<n-1;i++){
    console.log(pilaEventos.pop().getIdEvento());
}*/




//---- Testeo  Primitivos ----

/*for(let i=0; i<n;i++){
    pilaEventos.push(i);
}


console.time('Tiempo eliminacion:');
pilaEventos.delete(n/2);
console.timeEnd('Tiempo eliminacion:');;*/


/*console.time('Execution Time');
for(let i=0; i<n;i++){
    console.log(listaEventos.popFront());
}
console.timeEnd('Execution Time');*/

//---- Testeo  Eventos ----
/*console.time('Execution Time');
for(let i=0; i<n;i++){
    let evento = new Evento(i,"Bogotá","31/10/2023",50+i);
    listaEventos.pushFront(evento);
}

console.timeEnd('Execution Time');


console.time('Execution Time');
for(let i=0; i<n;i++){
    console.log(listaEventos.popFront().getIdEvento());
}
console.timeEnd('Execution Time');*/

//---- Testeo  Eventos ----
/*console.time('Execution Time');

for(let i=0; i<n;i++){
    let evento = new Evento(i,"Bogotá","31/10/2023",50+i);
    pilaEventos.push(evento);
}

console.timeEnd('Execution Time');


console.time('Execution Time');
for(let i=0; i<n;i++){
    console.log(pilaEventos.pop().getIdEvento());
}
console.timeEnd('Execution Time');*/

//---- Testeo  Primitivos ----
/*console.time('Execution Time');

for(let i=0; i<n;i++){
    pilaEventos.push(i);
}

console.timeEnd('Execution Time');


console.time('Execution Time');
for(let i=0; i<n;i++){
    console.log(pilaEventos.pop());
}
console.timeEnd('Execution Time');*/





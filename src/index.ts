import Evento from "./Evento";
import Pila from "./Pila";
import ListaEnlazada from "./ListaEnlazada";

let listaEventos = new ListaEnlazada<Evento>();



let modEventos = 1;
while(modEventos!= 0){
    console.log("Menu de eventos");
    console.log("1.Añadir evento");
    console.log("2.Consultar eventos");
    console.log("3.Eliminar evento");
    console.log("0.Salir");
    let opcion = prompt();

    if(opcion == "1"){
        console.log("Digite el id del evento");
        let idEvento = prompt();
        console.log("Digite la ubicacion del evento");
        let ubicacion = prompt();
        console.log("Digite la fecha del evento");
        let fecha = prompt();
        console.log("Digite el numero de boletas del evento");
        let nBoletas = prompt();
        let evento = new Evento(idEvento, ubicacion, fecha, nBoletas);

        listaEventos.pushFront(evento);
    }
    else if(opcion == "2"){
        listaEventos.searchAll();
    }
    else if(opcion == "3"){
        console.log("Digite el idEvento que quiere eliminar");
        let eliminarE = prompt();
        listaEventos.erase(eliminarE);
    }


}
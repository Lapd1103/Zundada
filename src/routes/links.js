const express = require('express');
const pila = require('../estructuras/pila');
const minHeap = require('../estructuras/minHeap');
const router = express.Router();

let n = 1000;
let pilaEventos = new pila(n);
pilaEventos.loadData('evento');

let heapEventos = new minHeap(n);

//Conexión base de datos
const pool = require('../database');

router.get('/salir',(req,res) =>{
    pilaEventos.updateDB("evento");
    res.render('home');
});

// Links modulo Evento
router.get('/registroEvento',(req, res) =>{
    res.render('links/registroEvento');
});

router.post('/registroEvento',(req, res) =>{
    const {nombre, lugar, fecha, hora, numeroboletas} = req.body;
    const newEvento ={
        idEvento: pilaEventos.peek().idEvento +1,
        nombre,
        lugar,
        fecha,
        hora,
        numeroboletas,
        Bdisponibles: numeroboletas 
    }
    pilaEventos.push(newEvento);
    res.render('links/registroEvento');
});

router.get('/listaEventos',(req, res) =>{   //Consulta de eventos por orden de creación
    res.render('links/listaEventos',{eventos: pilaEventos.getArray()});
});

router.get('/listaEventosPriority',(req, res) =>{   //Consulta de eventos por prioridad
    //pilaEventos.updateDB("evento"); //Actualizacion BD desde Pila
    heapEventos.loadData(); //Cargan los datos desde BD a minHeap
    
    res.render('links/listaEventosPriority',{eventos: heapEventos.getData()});
});

router.get('/deleteEvento/:id', async(req, res) => {
    const evento = req.params.id;
    pilaEventos.delete(evento);

    res.render('links/listaEventos',{eventos: pilaEventos.getArray()});
});


router.get('/editEvento/:id', (req, res) => {
    const idEvento = req.params.id;

    const evento = pilaEventos.getIndice(pilaEventos.find(idEvento));
    console.log(evento);
    res.render('links/editEvento',{evento: evento});
});

router.post('/editEvento/:id', (req, res) => {
    const idEvento = req.params.id;
    const evento = req.body;
    evento.idEvento = idEvento;
    evento.Bdisponibles = evento.numeroboletas;

    pilaEventos.update(idEvento, evento);
    
    res.render('links/listaEventos',{eventos: pilaEventos.getArray()});
});

// Links modulo Cliente
router.get('/registroCliente',(req, res) =>{
    res.render('links/registroCliente');
});

router.get('/listaClientes',(req, res) =>{
    res.render('links/listaClientes');
});

// Links modulo Organizador
router.get('/registroOrg',(req, res) =>{
    res.render('links/registroOrg');
});

router.get('/listaOrg',(req, res) =>{
    res.render('links/listaOrg');
});

// Links modulo Administrador
router.get('/registroAdmin',(req, res) =>{
    res.render('links/registroAdmin');
});

router.get('/listaAdmins',(req, res) =>{
    res.render('links/listaAdmins');
});


module.exports = router;
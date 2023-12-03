const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin , isOrganizador} = require('../lib/auth');

const pila = require('../estructuras/pila');
const minHeap = require('../estructuras/minHeap');
const BinarySearchTree = require('../estructuras/BST');

let n = 1000;
let pilaEventos = new pila(n);
pilaEventos.loadData('evento');

let heapEventos = new minHeap(n);

let eventosBST = new BinarySearchTree();


//Conexión base de datos
const pool = require('../database');

router.get('/salir',(req, res, next) => {
    pilaEventos.updateDB("evento");
    req.logOut(req.user, err =>{
        if(err) return next(err);
        res.redirect('/login'); 
    });
});

// Links modulo Evento
router.get('/registroEvento', isLoggedIn, isOrganizador, (req, res) =>{
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
    req.flash('success','Evento creado correctamente');
    res.render('links/registroEvento');
});

router.get('/listaEventos', isLoggedIn, (req, res) =>{   //Consulta de eventos por orden de creación
    res.render('links/listaEventos',{eventos: pilaEventos.getArray()});
});

/*router.post('/listaEventos', (req, res) => {    //Consulta por nombre evento BST
    eventosBST.loadData();
    //console.log(eventosBST.getRoot().getRightChild());
    res.send(req.body);
});*/

router.get('/listaEventosPriority', isLoggedIn, (req, res) =>{   //Consulta de eventos por prioridad
    //pilaEventos.updateDB("evento"); //Actualizacion BD desde Pila
    heapEventos.loadData(); //Cargan los datos desde BD a minHeap

    res.render('links/listaEventosPriority',{eventos: heapEventos.getData()});
});

router.get('/deleteEvento/:id', isLoggedIn, isOrganizador, async(req, res) => {
    const evento = req.params.id;
    pilaEventos.delete(evento);

    res.render('links/listaEventos',{eventos: pilaEventos.getArray()});
});


router.get('/editEvento/:id', isLoggedIn, isOrganizador, (req, res) => {
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
router.get('/registroCliente', isLoggedIn, isAdmin,(req, res) =>{
    res.render('links/registroCliente');
});

router.get('/listaClientes', isLoggedIn, isAdmin, (req, res) =>{
    res.render('links/listaClientes');
});

// Links modulo Organizador
router.get('/registroOrg', isLoggedIn, isAdmin, (req, res) =>{
    res.render('links/registroOrg');
});

router.get('/listaOrg', isLoggedIn, isAdmin, (req, res) =>{
    res.render('links/listaOrg');
});

// Links modulo Administrador
router.get('/registroAdmin', isLoggedIn, isAdmin,(req, res) =>{
    res.render('links/registroAdmin');
});

router.get('/listaAdmins', isLoggedIn, isAdmin,(req, res) =>{
    res.render('links/listaAdmins');
});



//PROFILE

router.get('/editProfile', isLoggedIn, (req, res) => {
    res.send('----- Editar Perfil -----');
    res.send('En construccion');
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { isLoggedIn, isAdmin , isOrganizador} = require('../lib/auth');

const pila = require('../estructuras/pila');
const minHeap = require('../estructuras/minHeap');
const BinarySearchTree = require('../estructuras/BST');
const HashTable = require('../estructuras/hash');

let n = 1000;
let pilaEventos = new pila(n);
pilaEventos.loadData('evento');

let heapEventos = new minHeap(n);
let hashTable = new HashTable();
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

router.get('/infoEvento/:id', isLoggedIn, (req, res) => {
    const idEvento = req.params.id;

    const evento = pilaEventos.getIndice(pilaEventos.find(idEvento));
    console.log(evento);
    res.render('links/infoEvento',{evento: evento});
});

router.post('/infoEvento/:id', isLoggedIn, async (req, res) => {
    const idEvento = req.params.id;
    
    const evento = await pool.query('SELECT * FROM evento WHERE idEvento ='+idEvento);
    
    const valor = evento[0].Bdisponibles - req.body.boletasCompra;
    const result = await pool.query('UPDATE evento SET Bdisponibles = '+valor+' WHERE evento.idEvento = '+idEvento);
    
    pilaEventos.comprarBoleta(idEvento, valor);
    
    res.redirect('https://wa.me/573227151450/?text=Buen%20dia,%20me%20gustaria%20comprar%20'+req.body.boletasCompra+'%20entradas%20para%20el%20evento '+evento[0].nombre);
});

// Links modulo Cliente
router.get('/registroCliente', isLoggedIn, isAdmin,(req, res) =>{
    res.render('links/registroCliente');
});

router.get('/listaClientes', isLoggedIn, isAdmin, async (req, res) =>{
    const clientes = await pool.query('SELECT * FROM usuario WHERE Rol = "Cliente"');
    
    const cedula = await pool.query('SELECT * FROM cliente');

    for(var i = 0; i < clientes.length; i++){
        clientes[i].Cedula = cedula[i].Cedula;
    }

    res.render('links/listaClientes',{clientes: clientes});
});

// Links modulo Organizador
router.get('/registroOrg', isLoggedIn, isAdmin, (req, res) =>{
    res.render('links/registroOrg');
});

router.get('/listaOrg', isLoggedIn, isAdmin, async (req, res) =>{
    const organizadores = await pool.query('SELECT * FROM usuario WHERE Rol = "Organizador"');
    
    const otrosDatos = await pool.query('SELECT * FROM organizador');

    for(var i = 0; i < organizadores.length; i++){
        organizadores[i].organizacion = otrosDatos[i].organizacion;
        organizadores[i].telefono = otrosDatos[i].telefono;
    }

    res.render('links/listaOrg',{item: organizadores});
});

router.get('/deleteAdmin/:id', isLoggedIn, isAdmin, async (req, res) => {
    const admin = req.params.id;

    const result = await pool.query('DELETE FROM usuario WHERE idUsuario = "'+admin+'"');
    console.log(result);
    res.render('links/registroAdmin');
});

router.get('/editAdmin/:id', isLoggedIn, isAdmin, async (req, res) => {
    const idAdmin = req.params.id;

    const admin = await pool.query('SELECT * FROM usuario WHERE idUsuario = '+idAdmin);

    console.log(admin);
    res.render('links/editAdmin',{admin: admin[0]});
});

router.post('/editAdmin/:id', async (req, res) => {
    const idAdmin = req.params.id;
    const admin = req.body;
    admin.idUsuario = idAdmin;
    admin.Clave = hashTable.encodePasswordWithSalt(admin.Clave);

    const result = await pool.query('UPDATE usuario SET `Nombre`="'+admin.Nombre+'",Usuario="'+admin.Usuario+'",Clave="'+admin.Clave+'",Correo="'+admin.Correo+'" WHERE idUsuario='+admin.idUsuario);
    console.log(result);
    res.render('links/registroAdmin');
});


// Links modulo Administrador
router.get('/registroAdmin', isLoggedIn, isAdmin,(req, res) =>{
    res.render('links/registroAdmin');
});

router.post('/registroAdmin', async (req, res) =>{
    const {Nombre, Correo, Usuario, Clave} = req.body;
    const newAdmin = {
        Nombre,
        Usuario,
        Clave,
        Correo,
        Rol : 'Administrador'
    } 
    newAdmin.Clave = hashTable.encodePasswordWithSalt(newAdmin.Clave);
    
    const result = await pool.query('INSERT INTO `usuario`(`Nombre`, `Usuario`, `Clave`, `Correo`, `Rol`) VALUES ("'+newAdmin.Nombre+'","'+newAdmin.Usuario+'","'+newAdmin.Clave+'","'+newAdmin.Correo+'","'+newAdmin.Rol+'")');
    res.redirect('/listaAdmins');
});

router.get('/listaAdmins', isLoggedIn, isAdmin,async (req, res) =>{
    const admins = await pool.query('SELECT * FROM usuario WHERE Rol = "Administrador"');

    res.render('links/listaAdmins',{item: admins});
});



//PROFILE

router.get('/editProfile', isLoggedIn, (req, res) => {
    res.render('links/editProfile');
});

router.post('/editProfile',async (req, res) => {
    const nuevaInfo = req.body;
    nuevaInfo.idUsuario = req.user.idUsuario;
    nuevaInfo.Rol = req.user.Rol;
    nuevaInfo.Clave = hashTable.encodePasswordWithSalt(nuevaInfo.Clave);

    const result = await pool.query('UPDATE usuario SET `Nombre` = "'+nuevaInfo.Nombre+'", `Usuario` = "'+nuevaInfo.Usuario+'", `Clave` = "'+nuevaInfo.Clave+'", `Correo` = "'+nuevaInfo.Correo+'" WHERE `usuario`.`idUsuario` = '+nuevaInfo.idUsuario);
    
    res.redirect('/home');

    
});
module.exports = router;
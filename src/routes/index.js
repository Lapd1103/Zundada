const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('Hello World');
});

// Links modulo Evento
router.get('/registroEvento',(req, res) =>{
    res.render('links/registroEvento');
});

router.get('/listaEventos',(req, res) =>{
    res.render('links/listaEventos');
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
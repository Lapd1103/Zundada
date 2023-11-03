const express = require('express');
const router = express.Router();

//Conexión base de datos
const pool = require('../database');

router.get('/login',(req, res) =>{
    res.render('links/login');
});

router.post('/login',(req,res) =>{
    const { user, password, rol} = req.body;
    const newLink = {
        user,
        password,
        rol
    };
    
    res.send('received');
});

router.get('/signIn',(req,res) =>{
    res.render('links/signIn');
});

module.exports = router;
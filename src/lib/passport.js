const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');
const HashTable = require('../estructuras/hash');

let hashTable = new HashTable();


//---- Login de usuarios ----
passport.use('local.login', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'clave',
    passReqToCallback: true
}, async (req, usuario,clave, done) =>{

    const rows = await pool.query('SELECT * FROM usuario WHERE Usuario = ?',[usuario]);
    
    if(rows.length > 0){
        const user = rows[0];
        console.log(clave);
        console.log(user.Clave);
        
        //IMPLEMENTACION CON HASH
        const validPassword = hashTable.matchPassword(clave, user.Clave);
        console.log(validPassword);

        if(validPassword){
            done(null, user, req.flash('success','Welcome' + user.Nombre));
        }else{
            done(null, false, req.flash('message','Nombre de usuario o contraseña incorrecta'));
        }
    }else{
        return done(null,false, req.flash('message','Nombre de usuario o contraseña incorrecta'));
    }
}));


//---- Registro de clientes ----
passport.use('local.signIn', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'clave',
    passReqToCallback: true
},async (req, usuario, clave, done) => {
    const {nombre, correo, cedula} = req.body;
    const newCliente = {
        Nombre: nombre,
        Usuario: usuario,
        Clave: clave,
        Correo :correo,
        Rol: 'Cliente'
    };
    newCliente.Clave = hashTable.encodePasswordWithSalt(clave);

    const {insertId} = await pool.query('INSERT INTO usuario SET ?', [newCliente]);
    const result = await pool.query("INSERT INTO cliente(Cedula,idUsuarioCliente) VALUES ('"+cedula+"',(SELECT idUsuario FROM usuario WHERE Usuario='"+usuario+"'));");
    
    //Actualización cliente
    newCliente.idUsuario = insertId;
    newCliente.Cedula = cedula;
    
    return done(null, newCliente);
}));

passport.serializeUser((user, done) => {
    done(null, user.idUsuario);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM usuario WHERE idUsuario = ?', [id]);
    done(null, rows[0]);
});
const mysql = require('mysql');
const {promisify}= require('util');

const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('CONEXION CON DB CERRADA');}
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DB CON MUCHAS CONEXIONES');}
        if(err.code === 'ECONNREFUSED'){
            console.error('CONEXION CON DB RECHAZADA');}
    }

    if(connection){
        connection.release();
        console.log('DB conectada');
        return;
    } 

})

//promisify pool Querys
pool.query = promisify(pool.query);

module.exports = pool;
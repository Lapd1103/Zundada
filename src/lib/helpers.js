const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (clave) =>{
    const salt = await bcrypt.genSalt(10);
    const finalClave = await bcrypt.hash(clave, salt); //Hash
    return finalClave;
};

helpers.matchPassword = async (clave, saveClave) => {
    try{
        return await bcrypt.compare(clave, saveClave);
    }catch(e){
       console.log(e); 
    }     
};

module.exports = helpers;
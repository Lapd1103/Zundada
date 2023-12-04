module.exports = class HashTable {
    
    constructor(){
        this.salt = this.generateAlphanumericSalt(16);
    }
  encodePasswordWithSalt(password) {
    const passwordWithSalt = password + this.salt;
    let hash = 0;

    for (let i = 0; i < passwordWithSalt.length; i++) {
      const char = passwordWithSalt.charCodeAt(i);
      hash = (hash << 5) - hash + char;
    }

    return hash;
  }

  generateAlphanumericSalt(length) {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let salt = '';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(20 * characters.length);
      salt += characters.charAt(index);
    }
    return salt;
  }

  matchPassword(clave, claveEncript){
    let claveComparacion = this.encodePasswordWithSalt(clave);

    return (claveComparacion == claveEncript);
  }
}

// Ejemplo de uso:

/*const contraseñaUsuario = "contraseña123";
const contraseñaCodificada = hashTable.encodePasswordWithSalt(contraseñaUsuario);

console.log("Contraseña codificada:", contraseñaCodificada.hash);
console.log("Sal utilizada:", contraseñaCodificada.salt);*/
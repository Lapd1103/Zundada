class Usuario {
  // Propiedades de la clase Usuario
  nombreUsuario: string;
  correoUsuario: string;
  clave: string;

  // Constructor para inicializar un usuario
  constructor(nombreUsuario: string, correoUsuario: string, clave: string) {
    this.nombreUsuario = nombreUsuario;
    this.correoUsuario = correoUsuario;
    this.clave = clave;
  }
}

class BaseDeDatosUsuarios {
  private usuarios: Usuario[] = [];

  // Creación de un usuario
  crearNuevoUsuario(nombreUsuario: string, correoUsuario: string, clave: string): void {
    const nuevoUsuario = new Usuario(nombreUsuario, correoUsuario, clave);
    this.usuarios.push(nuevoUsuario);
  }

  // Inserción de un solo dato (equivalente a crearNuevoUsuario)

  // Actualización de un solo dato por índice
  actualizarUsuario(indice: number, nuevoUsuario: Usuario): void {
    if (indice >= 0 && indice < this.usuarios.length) {
      this.usuarios[indice] = nuevoUsuario;
    }
  }

  // Eliminación de un solo dato por índice
  eliminarUsuario(indice: number): void {
    if (indice >= 0 && indice < this.usuarios.length) {
      this.usuarios.splice(indice, 1);
    }
  }

  // Búsqueda de un solo dato por nombre de usuario
  buscarUsuarioPorNombre(nombreUsuario: string): Usuario | undefined {
    return this.usuarios.find((usuario) => usuario.nombreUsuario === nombreUsuario);
  }

  // Consulta de todos los datos
  consultarUsuarios(): Usuario[] {
    return this.usuarios;
  }

  // Almacenamiento de los datos (equivalente a crearNuevoUsuario)
}

// Ejemplo de uso
const baseDeDatos = new BaseDeDatosUsuarios();
baseDeDatos.crearNuevoUsuario("usuario1", "usuario1@email.com", "clave123");
baseDeDatos.crearNuevoUsuario("usuario2", "usuario2@email.com", "clave456");

console.log("Usuarios almacenados:");
console.log(baseDeDatos.consultarUsuarios());

const usuarioBuscado = baseDeDatos.buscarUsuarioPorNombre("usuario1");
console.log("Usuario buscado:");
console.log(usuarioBuscado);

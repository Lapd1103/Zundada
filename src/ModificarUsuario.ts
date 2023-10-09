class Usuario {
    nombreUsuario: string;
    nombre: string;
    clave: string;
    correoUsuario: string;

    constructor(nombreUsuario: string, nombre: string, clave: string, correoUsuario: string,) {
        this.nombreUsuario = nombreUsuario;
        this.nombre = nombre;
        this.clave = clave;
        this.correoUsuario = correoUsuario;
    }
}

const colaUsuarios: Usuario[] = [];
//Ejemplos de usuarios

colaUsuarios.push(
  new Usuario(
    "usuario1",
    "Juan",
    "BTMhcs84.",
    "juan@gmail.com",
  )
);

colaUsuarios.push(
  new Usuario(
    "usuario2",
    "María",
    "BTFnfhs34.",
    "maria@example.com",
  )
);

colaUsuarios.push(
  new Usuario(
    "usuario3",
    "Pedro",
    "BTFhjhfjfg75.",
    "pedro@example.com",
  )
);

function main() {
    while (true) {
      console.log("\nMenú de opciones:");
      console.log("1. Actualizar Nombre de Usuario");
      console.log("2. Actualizar Nombre");
      console.log("3. Actualizar Correo Electrónico");
      console.log("4. Salir del sistema");

      const input = prompt("Elija una opción (ingrese un número):");
      if (input !== null){
        const opcion = parseInt(input, 10);
        if (!isNaN(opcion)){
            if (opcion === 4) {
                console.log("Saliendo del sistema.");
                break;
            }
            else if (opcion >= 1 && opcion <= 3){
                const nombreUsuario = prompt("Ingrese su nombre de usuario:");
                const usuario = colaUsuarios.find((u) => u.nombreUsuario === nombreUsuario);
                if (usuario){
                    console.log("Datos actuales del usuario:");
                    console.log(usuario);
                    switch (opcion) {
                        case 1:
                          actualizarNombreUsuario(usuario);
                          break;
                        case 2:
                          actualizarNombre(usuario);
                          break;
                        case 3:
                          actualizarCorreoUsuario(usuario);
                          break;
                        default:
                          console.log("Opción no válida. Intente nuevamente.");
                          break;
                    }
                }
                else {
                    console.log("Usuario no encontrado.");
                }
            }
        }
        else {
            console.log("Opción no válida. Por favor, elija una opción válida.");
          }
      }
      else {
        console.log("Opción vacía. Por favor, elija una opción válida.");
      }
    }
} 

function actualizarNombreUsuario(usuario: Usuario) {
    let nuevoNombreUsuario = prompt("Ingrese el nuevo nombre de usuario:");
  
    while (nuevoNombreUsuario !== null && !esNombreUsuarioValido(nuevoNombreUsuario)) {
      console.log("El nombre de usuario no es válido o ya está en uso.");
      nuevoNombreUsuario = prompt("Ingrese un nuevo nombre de usuario:");
    }
  
    if (nuevoNombreUsuario !== null) {
      usuario.nombreUsuario = nuevoNombreUsuario;
      console.log("Nombre de Usuario actualizado con éxito!");
    } 
    else {
      console.log("Nombre de Usuario vacio. Operación cancelada.");
    }
}

function esNombreUsuarioValido(nombreUsuario: string) {
    if (nombreUsuario.length < 6) {
      console.log("El nombre de usuario debe tener al menos 6 caracteres.");
      return false;
    }
  
    const usuarioExistente = colaUsuarios.find((u) => u.nombreUsuario === nombreUsuario);
    if (usuarioExistente) {
      console.log("El nombre de usuario ya está en uso.");
      return false;
    }
  
    return true; 
}

function actualizarNombre(usuario: Usuario) {
    const nuevoNombre = prompt("Ingrese el nuevo nombre:");
    if (nuevoNombre!== null &&nuevoNombre.length<20) {
      usuario.nombre = nuevoNombre;
      console.log("Nombre actualizado con éxito!");
    }
    else {
        console.log("Nombre con una cantidad mayor a 20 caracteres o vacio. Operación Cancelada");
    }

}

function actualizarCorreoUsuario(usuario: Usuario) {
    let nuevoCorreoUsuario = prompt("Ingrese el nuevo correo electrónico:");
    while (nuevoCorreoUsuario !== null &&!esCorreoElectronicoValido(nuevoCorreoUsuario)) {
        console.log("El correo electrónico no es válido.");
        nuevoCorreoUsuario = prompt("Ingrese un nuevo correo electrónico:");
    }
    if (nuevoCorreoUsuario!== null) {
      usuario.correoUsuario = nuevoCorreoUsuario;
      console.log("Correo Electrónico actualizado con éxito!");
    }
    else {
        console.log("El campo de correo electronico está vacio. Operación cancelada.");
    }
}
function esCorreoElectronicoValido(correoElectronico: string) {
    const regex = /@(gmail\.com|hotmail\.com|unal\.edu\.co)$/i;
    return regex.test(correoElectronico);
}

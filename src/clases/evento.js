module.exports = class evento{
    constructor(idEvento, nombre, lugar, fecha, hora, numeroboletas, Bdisponibles){
        this.idEvento = idEvento;
        this.nombre = nombre;
        this.lugar = lugar;
        this.fecha = fecha;
        this.hora = hora;
        this.numeroboletas = numeroboletas;
        this.Bdisponibles = Bdisponibles;
    }

    getBdisponibles(){
        return this.Bdisponibles;
    }

    getIdEvento(){
        return this.idEvento;
    }

    getNombre(){
        return this.nombre;
    }
}
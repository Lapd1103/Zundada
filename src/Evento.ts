class Evento{
    private idEvento: number;
    private ubicacion: string;
    private fecha: string;
    private nBoletas: number;
    private boletasDisp: number;

    public constructor(idEvento:number , ubicacion:string, fecha:string, nBoletas:number ){
        this.idEvento = idEvento;
        this.ubicacion = ubicacion;
        this.fecha = fecha;
        this.nBoletas = nBoletas;
        this.boletasDisp = nBoletas; 
    }

    //--- Getters and Setters ---
    public getIdEvento(): number{
        return this.idEvento;
    }
    public setIdEvento(idEvento:number){
        this.idEvento = idEvento;
    }

    public getUbicacion(): string{
        return this.ubicacion;
    }
    public setUbicacion(ubicacion:string){
        this.ubicacion = ubicacion;
    }

    public getFecha(): string{
        return this.fecha;
    }
    public setFecha(fecha:string){
        this.fecha = fecha;
    }

    public getNBoletas(): number{
        return this.nBoletas;
    }
    public setNBoletas(nBoletas:number){
        this.nBoletas = nBoletas;
    }

    public getBoletasDisp(): number{
        return this.boletasDisp;
    }
    public setBoletasDisp(boletasDisp:number){
        this.boletasDisp = boletasDisp; 
    }

}

export default Evento;

export class Cabecera {
    strNombre:string;
    numId:number;
  
    constructor();
    constructor(nombre?:string, id?:number){
        this.strNombre = nombre == undefined ? "" : nombre;
        this.numId = id == undefined ? 0 : id;
    }
}

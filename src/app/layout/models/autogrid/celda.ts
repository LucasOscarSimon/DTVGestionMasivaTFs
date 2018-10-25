export class Celda {
    strContenido: string;
    numColumnaId: number;
    numFilaId: number;
  
    constructor(contenido?:string, columnaId?: number, filaId?: number){
      this.strContenido = contenido == undefined ? "" : contenido;
      this.numColumnaId = columnaId == undefined ? 0 : columnaId;
      this.numFilaId = filaId == undefined ? 0 : filaId;
    }
}

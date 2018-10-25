import { Celda } from './celda';

export class Fila {
    oCeldas: Celda[];
    numFilaId: number;
    constructor();
    constructor(celdas?: Celda[], filaId?: number){
      this.oCeldas = celdas.length == 0 ? new Celda[0] : celdas;
      this.numFilaId = filaId == undefined ? 0 : filaId;
    }
}

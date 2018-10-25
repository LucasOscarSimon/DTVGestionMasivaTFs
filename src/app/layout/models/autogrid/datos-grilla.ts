import {Fila} from './fila';
import {Celda} from './celda';
import {Cabecera} from './cabecera';

export class DatosGrilla {
    oCabeceras: Cabecera[];
  oCeldas: Celda[];
  oFilas: Fila[];
  Valid: boolean;

  constructor();
  constructor(cabeceras?: Cabecera[], celdas?: Celda[], filas?: Fila[]){
    if(filas.length == 0){
      if(cabeceras.length > 0){
        var filaCabeceras:Fila = new Fila();
        filaCabeceras.numFilaId = 0;

        cabeceras.forEach( function(header) {
          var celda;
          celda = new Celda(header.strNombre,header.numId,header.numId);
          filaCabeceras.oCeldas.push(celda);
        });
        
        this.oFilas.push(filaCabeceras);
      } else {
        if(celdas.length > 0){
          celdas.forEach(function(celda){
            
          });
        }
      }
    }
    this.oCabeceras = cabeceras.length == 0 ? new Cabecera[0] : cabeceras ; 
    this.oCeldas = celdas.length == 0 ? new Celda[0] : celdas;
    this.oFilas = filas.length == 0 ? new Fila[0] : filas; 
  }

  buildRows(celdas:Celda[]){
    celdas.forEach(cell => {
      
    });
  }
}

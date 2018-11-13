import { Injectable } from '@angular/core';
import { AjusteMasivo } from '../../models/ajuste-masivo/ajuste-masivo';
import { RegistroAuditoria } from '../../models/consulta-auditoria/registro-auditoria';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TransaccionesFinancierasService {
  urlBaseBackend: string = "http://localhost:55342/";
  urlBackEnd: string = "";
  
  constructor(private _http: HttpClient) { }

  subirAjustesCsv(csv: AjusteMasivo): Observable<AjusteMasivo> {
    try {
      this.urlBackEnd = this.urlBaseBackend + "api/AjusteMasivo/ProcesarArchivo";
      return this._http.post<AjusteMasivo>(this.urlBackEnd, csv, httpOptions).pipe(
        tap((csv: AjusteMasivo) => this.log(`agregado ajuste masivo w/ id=${csv.obeCabecera.UsuarioWindows}`)),
        catchError(this.handleError<AjusteMasivo>('addCSV'))
      );
    } catch {
      console.log("Error en la subida");
    }
  }

  subirPagosCsv(csv: object) {
    try {
      console.log("Subida correcta", csv);
    } catch {
      console.log("Error en la subida");
    }
  }

  subirBorradosCsv(csv: object) {
    try {
      console.log("Subida correcta", csv);
    } catch {
      console.log("Error en la subida");
    }
  }

  ConsultarRegistrosAuditoria(strUsuario:string, dteFechaInicio: string, dteFechaFin: string,
    strNombreArchivo:string, numIdEstado:number, 
    numIdTipoProceso:number): Observable<RegistroAuditoria[]> {
      try {
        this.urlBackEnd = this.urlBaseBackend + 
          `api/ConsultaAuditoria/Filtrar?strUsuario=${strUsuario}` + `&dteDesde=${dteFechaInicio}`
          + `&dteHasta=${dteFechaFin}` + `&strNombreArchivo=${strNombreArchivo}`
          + `&intTipoProceso=${numIdTipoProceso}` + `&intEstado=${numIdEstado}`;
        return this._http.get<RegistroAuditoria[]>(this.urlBackEnd)
          .pipe(
            tap(_ => this.log('fetched RegistroAuditoria')),
            catchError(this.handleError('ConsultarLogAuditoria', []))
          );
      } catch {
        console.log("Error en la subida");
      }
    }

  log(msj){
    console.log(msj);
  }
  
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}

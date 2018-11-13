import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalParametersService } from '../global-parameters-service';
import { AjusteMasivoInterface } from '../../interfaces/ajuste-masivo/ajuste-masivo';
import { AjusteMasivo } from '../../models/ajuste-masivo/ajuste-masivo';
import { RegistroAuditoria } from '../../models/consulta-auditoria/registro-auditoria';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AjusteMasivoService implements AjusteMasivoInterface {
  //Properties:
  urlBaseBackend: string = "";
  urlBackEnd: string = "";

  //Constructor
  constructor(private _http: HttpClient,
    private _GlobalParametersService: GlobalParametersService) { 
      this.urlBaseBackend = this._GlobalParametersService.getUrlBaseWebAPI();
  }

  //Funciones
  ProcesarArchivoAjusteMasivo(oAjusteMasivo: AjusteMasivo): Observable<AjusteMasivo> {
    this.urlBackEnd = this.urlBaseBackend + "api/AjusteMasivo/ProcesarArchivo";
      return this._http.post<AjusteMasivo>(this.urlBackEnd, oAjusteMasivo, 
            this._GlobalParametersService.getHttpOptions())
              .pipe(
                  catchError(
                      this._GlobalParametersService.
                        handleError<AjusteMasivo>('importAjusteMasivo')
                  )
              );
  }

  ConsultarHistorialAjusteMasivo(dteDesde: Date, dteHasta: Date, strUsuarioWindows: string, 
    strNombreArchivo: string, numEstado: number): Observable<RegistroAuditoria[]>{
    this.urlBackEnd = this.ConstructURLHistorialAjusteMasivo(dteDesde,dteHasta,
                                              strUsuarioWindows,strNombreArchivo,numEstado);
    return this._http.get<RegistroAuditoria[]>(this.urlBackEnd)
      .pipe(
        catchError(
            this._GlobalParametersService.
              handleError('ConsultarHistorialAjusteMasivo', [])
        )
      );
  }

  ConsultarHistorialAjusteMasivoPorDefecto(strUsuarioWindows: string): Observable<RegistroAuditoria[]> {
    this.urlBackEnd = this.ConstructURLHistorialDefaultAjusteMasivo(strUsuarioWindows);
    return this._http.get<RegistroAuditoria[]>(this.urlBackEnd)
      .pipe(
        catchError(
          this._GlobalParametersService.
            handleError('ConsultarHistorialAjusteMasivoPorDefecto', [])
        )
      );
  }
  
  //Funciones Útiles
  private ConstructURLHistorialAjusteMasivo(dteDesde: Date, dteHasta: Date, strUsuarioWindows: string, 
    strNombreArchivo: string, numEstado: number):string{
    return this.urlBaseBackend + 
      `api/AjusteMasivo/Historial?strUsuario=${strUsuarioWindows}` + `&dteDesde=${dteDesde}`
      + `&dteHasta=${dteHasta}` + `&strNombreArchivo=${strNombreArchivo}`
      + `&sintEstado=${numEstado}`;
  }

  private ConstructURLHistorialDefaultAjusteMasivo(strUsuarioWindows: string):string{
    return this.urlBaseBackend + 
      `api/AjusteMasivo/HistorialDefault?strUsuario=${strUsuarioWindows}`;
  }
}

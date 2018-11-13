import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GlobalParametersService } from '../global-parameters-service';
import { PagoMasivoInterface } from '../../interfaces/pago-masivo/pago-masivo';
import { PagoMasivo } from '../../models/pago-masivo/pago-masivo';
import { RegistroAuditoria } from '../../models/consulta-auditoria/registro-auditoria';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagoMasivoService implements PagoMasivoInterface {
  //Properties:
  urlBaseBackend: string = "";
  urlBackEnd: string = "";

  //Constructor
  constructor(private _http: HttpClient,
    private _GlobalParametersService: GlobalParametersService) { 
      this.urlBaseBackend = this._GlobalParametersService.getUrlBaseWebAPI();
  }

  //Funciones
  ProcesarArchivoPagoMasivo(oPagoMasivo: PagoMasivo): Observable<PagoMasivo> {
    this.urlBackEnd = this.urlBaseBackend + "api/PagoMasivo/ProcesarArchivo";
      return this._http.post<PagoMasivo>(this.urlBackEnd, oPagoMasivo, 
            this._GlobalParametersService.getHttpOptions())
              .pipe(
                  catchError(
                      this._GlobalParametersService.
                        handleError<PagoMasivo>('importPagoMasivo')
                  )
              );
  }
  ConsultarHistorialPagoMasivo(dteDesde: Date, dteHasta: Date, strUsuarioWindows: string, 
      strNombreArchivo: string, numEstado: number): Observable<RegistroAuditoria[]> {
    this.urlBackEnd = this.ConstructURLHistorialPagoMasivo(dteDesde,dteHasta,
          strUsuarioWindows,strNombreArchivo,numEstado);
    return this._http.get<RegistroAuditoria[]>(this.urlBackEnd)
              .pipe(
                catchError(
                  this._GlobalParametersService.
                  handleError('ConsultarHistorialPagoMasivo', [])
                )
              );
  }
  ConsultarHistorialPagoMasivoPorDefecto(strUsuarioWindows: string): Observable<RegistroAuditoria[]> {
    this.urlBackEnd = this.ConstructURLHistorialDefaultPagoMasivo(strUsuarioWindows);
    return this._http.get<RegistroAuditoria[]>(this.urlBackEnd)
      .pipe(
        catchError(
          this._GlobalParametersService.
            handleError('ConsultarHistorialPagoMasivoPorDefecto', [])
        )
      );
  }

  //Funciones Útiles
  private ConstructURLHistorialPagoMasivo(dteDesde: Date, dteHasta: Date, strUsuarioWindows: string, 
    strNombreArchivo: string, numEstado: number):string{
    return this.urlBaseBackend + 
      `api/PagoMasivo/Historial?strUsuario=${strUsuarioWindows}` + `&dteDesde=${dteDesde}`
      + `&dteHasta=${dteHasta}` + `&strNombreArchivo=${strNombreArchivo}`
      + `&sintEstado=${numEstado}`;
  }

  private ConstructURLHistorialDefaultPagoMasivo(strUsuarioWindows: string):string{
    return this.urlBaseBackend + 
      `api/PagoMasivo/HistorialDefault?strUsuario=${strUsuarioWindows}`;
  }
}

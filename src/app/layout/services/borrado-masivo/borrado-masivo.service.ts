import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalParametersService } from '../global-parameters-service';
import { BorradoMasivoInterface } from '../../interfaces/borrado-masivo/borrado-masivo';
import { BorradoMasivo } from '../../models/borrado-masivo/borrado-masivo';
import { RegistroAuditoria } from '../../models/consulta-auditoria/registro-auditoria';
import { DetalleBorradoConsulta } from '../../models/borrado-masivo/detalle-borrado-consulta';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BorradoMasivoService implements BorradoMasivoInterface {
  //Properties:
  urlBaseBackend: string = "";
  urlBackEnd: string = "";

  //Constructor
  constructor(private _http: HttpClient,
    private _GlobalParametersService: GlobalParametersService) { 
      this.urlBaseBackend = this._GlobalParametersService.getUrlBaseWebAPI();
  }

  //Funciones
  ProcesarArchivoBorradoMasivo(oBorradoMasivo: BorradoMasivo): Observable<BorradoMasivo> {
    this.urlBackEnd = this.urlBaseBackend + "api/BorradoMasivo/ProcesarArchivo";
      return this._http.post<BorradoMasivo>(this.urlBackEnd, oBorradoMasivo, 
            this._GlobalParametersService.getHttpOptions())
              .pipe(
                  catchError(
                      this._GlobalParametersService.
                        handleError<BorradoMasivo>('importBorradoMasivo')
                  )
              );
  }

  ObtenerMontosDetalleBorrado(oBorradoMasivo: BorradoMasivo): Observable<BorradoMasivo> {
    this.urlBackEnd = this.urlBaseBackend + "api/BorradoMasivo/ObtenerMontosFT";
      return this._http.post<BorradoMasivo>(this.urlBackEnd, oBorradoMasivo, 
            this._GlobalParametersService.getHttpOptions())
              .pipe(
                  catchError(
                      this._GlobalParametersService.
                        handleError<BorradoMasivo>('importBorradoMasivo')
                  )
              );
  }

  ConsultarHistorialBorradoMasivo(dteDesde: Date, dteHasta: Date, strUsuarioWindows: string, 
    strNombreArchivo: string, numEstado: number): Observable<RegistroAuditoria[]> {
      this.urlBackEnd = this.ConstructURLHistorialBorradoMasivo(dteDesde,dteHasta,
        strUsuarioWindows,strNombreArchivo,numEstado);
      return this._http.get<RegistroAuditoria[]>(this.urlBackEnd)
        .pipe(
          catchError(
            this._GlobalParametersService.
            handleError('ConsultarHistorialBorradoMasivo', [])
          )
        );
  }

  ConsultarHistorialBorradoMasivoPorDefecto(strUsuarioWindows: string): Observable<RegistroAuditoria[]>  {
    this.urlBackEnd = this.ConstructURLHistorialDefaultBorradoMasivo(strUsuarioWindows);
    return this._http.get<RegistroAuditoria[]>(this.urlBackEnd)
      .pipe(
        catchError(
          this._GlobalParametersService.
            handleError('ConsultarHistorialBorradoMasivoPorDefecto', [])
        )
      );
  }
  
  ConsultarDetalleBorradoMasivo(strUsuarioWindows: string, numIdAuditoria: number): Observable<DetalleBorradoConsulta[]> {
    this.urlBackEnd = this.ConstructURLDetalleBorradoMasivo(strUsuarioWindows,numIdAuditoria);
    return this._http.get<DetalleBorradoConsulta[]>(this.urlBackEnd)
      .pipe(
        catchError(
          this._GlobalParametersService.
            handleError('ConsultarHistorialBorradoMasivoPorDefecto', [])
        )
      );
  }

  //Funciones Útiles
  private ConstructURLHistorialBorradoMasivo(dteDesde: Date, dteHasta: Date, strUsuarioWindows: string, 
    strNombreArchivo: string, numEstado: number):string{
    return this.urlBaseBackend + 
      `api/BorradoMasivo/Historial?strUsuario=${strUsuarioWindows}` + `&dteDesde=${dteDesde}`
      + `&dteHasta=${dteHasta}` + `&strNombreArchivo=${strNombreArchivo}`
      + `&sintEstado=${numEstado}`;
  }

  private ConstructURLHistorialDefaultBorradoMasivo(strUsuarioWindows: string):string{
    return this.urlBaseBackend + 
      `api/BorradoMasivo/HistorialDefault?strUsuario=${strUsuarioWindows}`;
  }

  private ConstructURLDetalleBorradoMasivo(strUsuarioWindows: string,numIdAuditoria: number):string{
    return this.urlBaseBackend + 
      `api/AjusteMasivo/HistorialDetalleBorrado?strUsuario=${strUsuarioWindows}` + 
        `&decIdAuditoria=${numIdAuditoria}`;;
  }
}

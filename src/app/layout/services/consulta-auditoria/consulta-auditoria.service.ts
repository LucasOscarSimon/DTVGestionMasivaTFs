import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GlobalParametersService } from '../global-parameters-service';
import { ConsultaAuditoriaInterface } from '../../interfaces/consulta-auditoria/consulta-auditoria';
import { RegistroAuditoria } from '../../models/consulta-auditoria/registro-auditoria';
import { MaestrosConsultaAuditoria } from '../../models/consulta-auditoria/maestros-consulta-auditoria';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaAuditoriaService implements ConsultaAuditoriaInterface{
  //Properties:
  urlBaseBackend: string = "";
  urlBackEnd: string = "";

  //Constructor
  constructor(private _http: HttpClient,
    private _GlobalParametersService: GlobalParametersService) { 
      this.urlBaseBackend = this._GlobalParametersService.getUrlBaseWebAPI();
  }

  //Funciones
  ConsultarDatosAuditoriaPorDefecto(strUsuario: string): Observable<RegistroAuditoria[]> {
    this.urlBackEnd = this.ConstructURLConsultarDatosAuditoriaPorDefecto(strUsuario);
    return this._http.get<RegistroAuditoria[]>(this.urlBackEnd)
          .pipe(
            catchError(
              this._GlobalParametersService.
              handleError('ConsultarDatosAuditoriaPorDefecto', [])
            )
          );
  }

  ConsultarDatosAuditoria(strUsuario: string,dteDesde: Date, dteHasta: Date, strUsuarioWindows: string, 
          strNombreArchivo: string, numTipoProceso: number, 
          numEstado: number): Observable<RegistroAuditoria[]> {
    this.urlBackEnd = this.ConstructURLConsultarDatosAuditoria(strUsuario,dteDesde,dteHasta,
                            strUsuarioWindows,strNombreArchivo,numTipoProceso,numEstado);
    return this._http.get<RegistroAuditoria[]>(this.urlBackEnd)
          .pipe(
            catchError(
              this._GlobalParametersService.
              handleError('ConsultarDatosAuditoria', [])
            )
          );
  }

  ListarDatosMaestros(strUsuario: string): Observable<MaestrosConsultaAuditoria> {
    this.urlBackEnd = this.ConstructURLListarDatosMaestros(strUsuario);
    return this._http.get<MaestrosConsultaAuditoria>(this.urlBackEnd)
          .pipe(
            catchError(
              this._GlobalParametersService.
              handleError<MaestrosConsultaAuditoria>('ListarDatosMaestros')
            )
          );
  }

  //Funciones Útiles
  private ConstructURLConsultarDatosAuditoria(strUsuario: string, dteDesde: Date, dteHasta: Date, strUsuarioWindows: string, 
    strNombreArchivo: string, numTipoProceso: number, 
    numEstado: number):string{
    return this.urlBaseBackend + 
      `api/ConsultaAuditoria/DatosAuditoria?strUsuario=${strUsuario}` + `&dteDesde=${dteDesde}`
      + `&dteHasta=${dteHasta}` + `&strUsuarioWindows=${strUsuarioWindows}` 
      + `&strNombreArchivo=${strNombreArchivo}`
      + `&sintTipoProceso=${numTipoProceso}` + `&sintEstado=${numEstado}`;
  }

  private ConstructURLConsultarDatosAuditoriaPorDefecto(strUsuarioWindows: string):string{
    return this.urlBaseBackend + 
      `api/ConsultaAuditoria/DatosAuditoriaDefault?strUsuario=${strUsuarioWindows}`;
  }

  private ConstructURLListarDatosMaestros(strUsuarioWindows: string):string{
    return this.urlBaseBackend + 
      `api/ConsultaAuditoria/ListarMaestros?strUsuario=${strUsuarioWindows}`;
  }
}

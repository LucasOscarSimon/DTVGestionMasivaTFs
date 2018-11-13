import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GlobalParametersService } from '../global-parameters-service';
import { ConsultaHistorialInterface } from '../../interfaces/consulta-historial/consulta-historial';
import { Estado } from '../../models/common/estado';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultaHistorialService implements ConsultaHistorialInterface{
  //Properties:
  urlBaseBackend: string = "";
  urlBackEnd: string = "";

  //Constructor
  constructor(private _http: HttpClient,
    private _GlobalParametersService: GlobalParametersService) { 
      this.urlBaseBackend = this._GlobalParametersService.getUrlBaseWebAPI();
  }

  //Funciones
  ListarDatosMaestros(strUsuario: string): Observable<Estado[]> {
    this.urlBackEnd = this.ConstructURLListarDatosMaestros(strUsuario);
    return this._http.get<Estado[]>(this.urlBackEnd)
          .pipe(
            catchError(
              this._GlobalParametersService.
              handleError('ListarDatosMaestros',[])
            )
          );
  }

  //Funciones Útiles
  private ConstructURLListarDatosMaestros(strUsuarioWindows: string):string{
    return this.urlBaseBackend + 
      `api/ConsultaHistorial/ListarMaestros?strUsuario=${strUsuarioWindows}`;
  }
}

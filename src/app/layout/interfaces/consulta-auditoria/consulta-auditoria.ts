import { RegistroAuditoria } from '../../models/consulta-auditoria/registro-auditoria';
import { MaestrosConsultaAuditoria } from '../../models/consulta-auditoria/maestros-consulta-auditoria';
import { Observable } from 'rxjs';
export interface ConsultaAuditoriaInterface {
    ConsultarDatosAuditoriaPorDefecto(strUsuario: string):Observable<RegistroAuditoria[]>;
    ConsultarDatosAuditoria(strUsuario: string, dteDesde: Date, dteHasta: Date, 
        strUsuarioWindows: string, strNombreArchivo: string, 
        numTipoProceso:number, numEstado:number):Observable<RegistroAuditoria[]>;
    ListarDatosMaestros(strUsuario: string):Observable<MaestrosConsultaAuditoria>;
}

import { AjusteMasivo } from '../../models/ajuste-masivo/ajuste-masivo';
import { RegistroAuditoria } from '../../models/consulta-auditoria/registro-auditoria';
import { Observable } from 'rxjs';
export interface AjusteMasivoInterface {
    ProcesarArchivoAjusteMasivo(oAjusteMasivo: AjusteMasivo):Observable<AjusteMasivo>;
    ConsultarHistorialAjusteMasivo(dteDesde: Date, dteHasta: Date, 
        strUsuarioWindows: string, strNombreArchivo: string, numEstado:number):Observable<RegistroAuditoria[]>;
    ConsultarHistorialAjusteMasivoPorDefecto(strUsuarioWindows: string):Observable<RegistroAuditoria[]>;
}

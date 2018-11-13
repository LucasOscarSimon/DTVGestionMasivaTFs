import { PagoMasivo } from '../../models/pago-masivo/pago-masivo';
import { RegistroAuditoria } from '../../models/consulta-auditoria/registro-auditoria';
import { Observable } from 'rxjs';
export interface PagoMasivoInterface {
    ProcesarArchivoPagoMasivo(oPagoMasivo: PagoMasivo):Observable<PagoMasivo>;
    ConsultarHistorialPagoMasivo(dteDesde: Date, dteHasta: Date, 
        strUsuarioWindows: string, strNombreArchivo: string, numEstado:number):Observable<RegistroAuditoria[]>;
    ConsultarHistorialPagoMasivoPorDefecto(strUsuarioWindows: string):Observable<RegistroAuditoria[]>;
}

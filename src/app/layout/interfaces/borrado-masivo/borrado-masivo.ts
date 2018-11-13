import { BorradoMasivo } from '../../models/borrado-masivo/borrado-masivo';
import { RegistroAuditoria } from '../../models/consulta-auditoria/registro-auditoria';
import { DetalleBorradoConsulta } from '../../models/borrado-masivo/detalle-borrado-consulta';
import { Observable } from 'rxjs';
export interface BorradoMasivoInterface {
    ProcesarArchivoBorradoMasivo(oBorradoMasivo: BorradoMasivo):Observable<BorradoMasivo>;
    ObtenerMontosDetalleBorrado(oBorradoMasivo: BorradoMasivo):Observable<BorradoMasivo>;
    ConsultarHistorialBorradoMasivo(dteDesde: Date, dteHasta: Date, 
        strUsuarioWindows: string, strNombreArchivo: string, numEstado:number):Observable<RegistroAuditoria[]>;
    ConsultarHistorialBorradoMasivoPorDefecto(strUsuarioWindows: string):Observable<RegistroAuditoria[]>;
    ConsultarDetalleBorradoMasivo(strUsuarioWindows: string, numIdAuditoria:number):Observable<DetalleBorradoConsulta[]>;
}

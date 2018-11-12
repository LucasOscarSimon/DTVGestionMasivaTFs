import {TipoProceso} from './tipo-proceso'
import {Estado} from '../common/estado';
export class RegistroAuditoria {
    IdAuditoria:number;
    Archivo:string;
    UsuarioWindows: string;
    NombreUsuario: string;
    Motivo: string;
    MontoTotal: number;
    NroRegistrosArchivo: number;
    NroRegistrosProcesados: number;
    NroRegistrosValidos:number;
    NroRegistrosFallidos:number;
    EstaActivo:boolean;
    FechaCreacion:Date;
    UsuarioCreador:string;
    FechaModificacion:Date;
    UsuarioModificador:string;
    Estado:Estado;
    TipoProceso:TipoProceso;
}

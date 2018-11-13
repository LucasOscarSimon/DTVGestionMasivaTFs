import {TipoProceso} from './tipo-proceso'
import {Estado} from '../common/estado';
import { CabeceraGestionMasiva } from '../../models/gestion-masiva/cabecera-gestion-masiva';
export class RegistroAuditoria extends CabeceraGestionMasiva {
    IdAuditoria:number;
    EstaActivo:boolean;
    FechaCreacion:string;
    UsuarioCreador:string;
    FechaModificacion:string;
    UsuarioModificador:string;
    Estado:Estado;
    TipoProceso:TipoProceso;
}

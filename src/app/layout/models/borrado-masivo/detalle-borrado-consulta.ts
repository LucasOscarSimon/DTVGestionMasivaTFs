import {Estado} from '../common/estado';
export class DetalleBorradoConsulta {
    FinancialTransactionId:number;
    IdClienteIBS:number;
    Monto: number;
    DescripcionError: string;
    FechaCreacion:string;
    UsuarioCreador:string;
    FechaModificacion:string;
    UsuarioModificador:string;
    Estado:Estado;
}

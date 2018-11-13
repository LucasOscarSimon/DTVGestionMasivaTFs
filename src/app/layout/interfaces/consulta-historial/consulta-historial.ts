import {Estado} from '../../models/common/estado';
import { Observable } from 'rxjs';
export interface ConsultaHistorialInterface {
    ListarDatosMaestros(strUsuario: string):Observable<Estado[]>;
}

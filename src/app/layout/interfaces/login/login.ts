import { Usuario } from '../../models/login/usuario';
import { Observable } from 'rxjs';
export interface LoginInterface {
    logIn(oUsuario: Usuario):Observable<Usuario>;
}

import { Usuario } from '../../models/login/usuario';

export interface LoginInterface {
    autenticar(oUsuario: Usuario):boolean;
}

import { Usuario } from '../../models/login/usuario';

export interface LoginInterface {
    logIn(oUsuario: Usuario):boolean;
}

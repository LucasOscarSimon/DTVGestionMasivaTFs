import { Injectable } from '@angular/core';
import { LoginInterface } from '../../interfaces/login/login';
import { Usuario } from '../../models/login/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements LoginInterface{

  logIn(oUsuario: Usuario): boolean {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}

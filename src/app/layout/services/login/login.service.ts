import { Injectable } from '@angular/core';
import { LoginInterface } from '../../interfaces/login/login';
import { Usuario } from '../../models/login/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements LoginInterface{
  
  logIn(oUsuario: Usuario): Observable<Usuario> {
    throw new Error("Method not implemented.");
  }

  constructor() { }
}

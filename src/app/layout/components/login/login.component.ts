import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/login/usuario';
import { Router } from '@angular/router';
import { GlobalEventsManager } from '../../services/global-events-manager';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  MensajeBienvenida:string="";
  oUsuario: Usuario;
  constructor(
    private ORouter: Router,
    private OGlobalEventsManager: GlobalEventsManager
  ) { }

  ngOnInit() {
    this.oUsuario={
      strUsuario:'',
      strPassword:''
    }
  }

  onClickIngresar(){
    console.log("ingresar");
    console.log(this.oUsuario);
    this.OGlobalEventsManager.showHeader.emit(true);
    this.ORouter.navigate(['/home']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/login/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  MensajeBienvenida:string="";
  oUsuario: Usuario;
  constructor(
    private oRouter: Router
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
    this.oRouter.navigate(['/ajuste-masivo']);
  }
}

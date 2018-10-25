import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-importacion',
  templateUrl: './importacion.component.html',
  styleUrls: ['./importacion.component.css']
})



export class ImportacionComponent implements OnInit {
  @Output() oCambioEstado = new EventEmitter();
  @Output() oSimularSubida = new EventEmitter();
  constructor() {
   }

  ngOnInit() {  }

  abrirConsulta(){
    this.oCambioEstado.emit();
  }

  cargarArchivo(){
    this.oSimularSubida.emit();
  }

}

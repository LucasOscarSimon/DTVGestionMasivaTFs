import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-resumen-preliminar',
  templateUrl: './resumen-preliminar.component.html',
  styleUrls: ['./resumen-preliminar.component.css']
})
export class ResumenPreliminarComponent implements OnInit {
  @Output() oConfirmarSubida = new EventEmitter();
  @Output() oCancelarSubida = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }   

  confirmarCarga(){
    this.oConfirmarSubida.emit();
    this.oCancelarSubida.emit();
  }

  cancelarCarga(){
    this.oCancelarSubida.emit();
  }
  
}

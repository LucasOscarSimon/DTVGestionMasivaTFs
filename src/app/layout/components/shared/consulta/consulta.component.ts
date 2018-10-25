import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
//import {NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerPopup } from '../datepicker-popup/datepicker-popup.component';
import { DatosGrilla} from 'src/app/layout/models/autogrid/datos-grilla'
import { Celda} from 'src/app/layout/models/autogrid/celda'
import { Cabecera} from 'src/app/layout/models/autogrid/cabecera'
import { Fila} from 'src/app/layout/models/autogrid/fila'

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  @Input() strTipoTransaccion:string;
  @Output() oCambioEstado = new EventEmitter();

  oCabeceras:Cabecera[] = [
    {strNombre: 'Id', numId: 1},
    {strNombre: 'Nombre de Archivo', numId:2},
    {strNombre: 'Usuario', numId:3},
    {strNombre: 'Nro de Registros', numId:4},
    {strNombre: 'Monto Total', numId:5},
    {strNombre: 'Fecha y Hora', numId:6}
  ];
   oCeldas:Celda[] = [
    {strContenido: '23', numFilaId:1, numColumnaId: 1},
    {strContenido: 'Archivo.xls', numFilaId:2, numColumnaId: 2},
    {strContenido: 'PBLANCAS', numFilaId:3, numColumnaId: 3},
    {strContenido: '1234', numFilaId:4, numColumnaId: 4},
    {strContenido: '1234', numFilaId:5, numColumnaId: 5},
    {strContenido: '12/12/2018 14:14', numFilaId:6, numColumnaId: 6}
   ];

  constructor() { }

  

  ngOnInit() {
  }

  abrirUpload(){
    this.oCambioEstado.emit();
  }

}

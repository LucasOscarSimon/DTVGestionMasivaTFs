import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
//import {NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerPopup } from '../datepicker-popup/datepicker-popup.component';

class Column{
  name:string;
  id:number;

  constructor();
  constructor(name?:string, id?:number){
      this.name = name == undefined ? "" : name;
      this.id = id == undefined ? 0 : id;
  }
}

class Cell{
  content: string;
  id: number;
  columnId: number;

  constructor();
  constructor(content?:string, id?:number, columnId?:number){
    this.content = content == undefined ? "" : content;
    this.id = id == undefined ? 0 : id;
    this.columnId = columnId == undefined ? 0 : columnId;
  }

}

class GridModel{
  columns: Column[];
  cells: Cell[]

  constructor(columns:Column[],cells:Cell[]){
    this.columns = columns;
    this.cells = cells;
  }
}

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  @Input() transaccion:string;
  @Output() statusChange = new EventEmitter();

  columns:Column[] = [
    {name: 'Id', id: 1},
    {name: 'Nombre de Archivo', id:2},
    {name: 'Usuario', id:3},
    {name: 'Nro de Registros', id:4},
    {name: 'Monto Total', id:5},
    {name: 'Fecha y Hora', id:6}
  ];
  // cells:Cell[] = [

  // ]

  constructor() { }

  

  ngOnInit() {
  }

  abrirUpload(){
    this.statusChange.emit();
  }

}

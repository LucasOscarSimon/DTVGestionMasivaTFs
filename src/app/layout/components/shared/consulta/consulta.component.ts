import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
//import {NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { HeaderTable } from '../../../models/dynamic-table/header-table';


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
  selector: 'app-consulta-historial',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  @Input() headersConsulta: HeaderTable[];
  @Input() registrosConsulta: any[];
  @Input() estados: string[];
  @Input() strTipoProcesoMasivo:string;
  @Output() statusChange = new EventEmitter();
  loEstado: string[]=[];
  estadoSeleccionado:string;

  columns:Column[] = [
    {name: 'Id', id: 1},
    {name: 'Nombre de Archivo', id:2},
    {name: 'Usuario', id:3},
    {name: 'Nro de Registros', id:4},
    {name: 'Monto Total', id:5},
    {name: 'Fecha y Hora', id:6}
  ];
   cells:Cell[] = [
    {content: '23', id:1, columnId: 1},
    {content: 'Archivo.xls', id:2, columnId: 2},
    {content: 'PBLANCAS', id:3, columnId: 3},
    {content: '1234', id:4, columnId: 4},
    {content: '1234', id:5, columnId: 5},
    {content: '12/12/2018 14:14', id:6, columnId: 6}
   ];

  constructor() { }

  ngOnInit() {
  }

  abrirUpload(){
    this.statusChange.emit();
  }

}

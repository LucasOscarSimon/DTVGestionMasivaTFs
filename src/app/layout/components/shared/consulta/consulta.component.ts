import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
//import {NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { HeaderTable } from '../../../models/dynamic-table/header-table';
import { Estado } from '../../../models/common/estado';
import { FiltrosConsultaHistorial } from '../../../models/consulta-historial/filtros-consulta-historial';
import { UtilGestionMasiva } from '../../util/util.gestion-masiva';

// class Column{
//   name:string;
//   id:number;

//   constructor();
//   constructor(name?:string, id?:number){
//       this.name = name == undefined ? "" : name;
//       this.id = id == undefined ? 0 : id;
//   }
// }

// class Cell{
//   content: string;
//   id: number;
//   columnId: number;

//   constructor();
//   constructor(content?:string, id?:number, columnId?:number){
//     this.content = content == undefined ? "" : content;
//     this.id = id == undefined ? 0 : id;
//     this.columnId = columnId == undefined ? 0 : columnId;
//   }

// }

// class GridModel{
//   columns: Column[];
//   cells: Cell[]

//   constructor(columns:Column[],cells:Cell[]){
//     this.columns = columns;
//     this.cells = cells;
//   }
// }

@Component({
  selector: 'app-consulta-historial',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  @Output() EEBackToStart = new EventEmitter();
  @Output() EESearchHistorial = new EventEmitter();
  @Output() EESearchHistorialDefault = new EventEmitter();
  @Input() loHeadersConsultaHistorial: HeaderTable[];
  @Input() loResultSearch: any[];
  @Input() strTipoProcesoMasivo:string;
  loEstado: Estado[];
  oEstadoSeleccionado:Estado;
  oFiltrosConsultaHistorial:FiltrosConsultaHistorial;
  oLocaleEs: any;
  dteFechaDesde: Date=new Date();
  dteFechaHasta: Date=new Date();
  strNombreArchivo: string="";
  


  // columns:Column[] = [
  //   {name: 'Id', id: 1},
  //   {name: 'Nombre de Archivo', id:2},
  //   {name: 'Usuario', id:3},
  //   {name: 'Nro de Registros', id:4},
  //   {name: 'Monto Total', id:5},
  //   {name: 'Fecha y Hora', id:6}
  // ];
  //  cells:Cell[] = [
  //   {content: '23', id:1, columnId: 1},
  //   {content: 'Archivo.xls', id:2, columnId: 2},
  //   {content: 'PBLANCAS', id:3, columnId: 3},
  //   {content: '1234', id:4, columnId: 4},
  //   {content: '1234', id:5, columnId: 5},
  //   {content: '12/12/2018 14:14', id:6, columnId: 6}
  //  ];

  constructor(private _UtilGestionMasiva: UtilGestionMasiva) { }

  ngOnInit() {
    this.oLocaleEs = this._UtilGestionMasiva.GetSpanishLocale();
    this.EESearchHistorialDefault.emit();
  }

  BackToStart(){
    this.EEBackToStart.emit();
  }

  SearchHistorial(){
    this.SetFiltersConsulta();
    this.EESearchHistorial.emit(this.oFiltrosConsultaHistorial);
  }

  SetFiltersConsulta(){
    this.oFiltrosConsultaHistorial = new FiltrosConsultaHistorial();
  }

  DownloadRecords(){
    
  }
}

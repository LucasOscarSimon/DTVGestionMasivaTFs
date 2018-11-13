import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AjusteMasivo } from '../../../models/ajuste-masivo/ajuste-masivo';
import { HeaderTable } from '../../../models/dynamic-table/header-table';

@Component({
  selector: 'app-resumen-procesamiento',
  templateUrl: './resumen-procesamiento.component.html',
  styleUrls: ['./resumen-procesamiento.component.css']
})
export class ResumenProcesamientoComponent implements OnInit {
  @Input() cols: HeaderTable[];
  @Input() registros: any[];
  @Input() strTipoProcesoMasivo: string;
  @Input() obeAjusteMasivo: AjusteMasivo;
  @Output() backToStart = new EventEmitter();
  
  constructor() { }

  ngOnInit() {

  }

  abrirUpload(){
    this.backToStart.emit();
  }

}

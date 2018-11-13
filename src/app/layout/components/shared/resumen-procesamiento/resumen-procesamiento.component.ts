import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CabeceraGestionMasiva } from '../../../models/gestion-masiva/cabecera-gestion-masiva';
import { HeaderTable } from '../../../models/dynamic-table/header-table';

@Component({
  selector: 'app-resumen-procesamiento',
  templateUrl: './resumen-procesamiento.component.html',
  styleUrls: ['./resumen-procesamiento.component.css']
})
export class ResumenProcesamientoComponent implements OnInit {
  @Output() EEBackToStart = new EventEmitter();
  @Input() loHeadersResumenProcesamiento: HeaderTable[];
  @Input() loDetalleInvalido: any[];
  @Input() oCabeceraGestionMasiva:CabeceraGestionMasiva;
  @Input() strTipoProcesoMasivo: string;
  
  constructor() { }

  ngOnInit() {

  }

  BackToStart(){
    this.EEBackToStart.emit();
  }

  DownloadRecords(){
    console.log("==========DownloadRecords==========");
  }
}

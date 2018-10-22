import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//Called components
import { ImportacionComponent } from 'src/app/shared/components/importacion/importacion.component'
import { ConsultaComponent } from 'src/app/shared/components/consulta/consulta.component'
import { ResumenPreliminarComponent } from 'src/app/shared/components/resumen-preliminar/resumen-preliminar.component'
import { ResumenProcesamientoComponent } from 'src/app/shared/components/resumen-procesamiento/resumen-procesamiento.component'

 var consultaOn:boolean = false;
 var resumenPreliminarOn:boolean = false;
 var resumenProcesamientoOn:boolean = false;
 
@Component({
  selector: 'app-ajuste-masivo',
  templateUrl: './ajuste-masivo.component.html',
  styleUrls: ['./ajuste-masivo.component.css']
})

export class AjusteMasivoComponent implements OnInit {
  transaccion:string = 'Ajustes';
  constructor() { }

  ngOnInit() {
  }

}

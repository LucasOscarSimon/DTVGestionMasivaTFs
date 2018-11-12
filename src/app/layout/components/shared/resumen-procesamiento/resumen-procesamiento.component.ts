import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AjusteMasivo } from '../../../models/ajuste-masivo/ajuste-masivo';

@Component({
  selector: 'app-resumen-procesamiento',
  templateUrl: './resumen-procesamiento.component.html',
  styleUrls: ['./resumen-procesamiento.component.css']
})
export class ResumenProcesamientoComponent implements OnInit {
  @Input() cols: any[];
  @Input() registros: any[];
  @Input() transaccion: string;
  @Input() obeAjusteMasivo: AjusteMasivo;
  @Output() backToStart = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }

  abrirUpload() {
    this.backToStart.emit();
  }

}

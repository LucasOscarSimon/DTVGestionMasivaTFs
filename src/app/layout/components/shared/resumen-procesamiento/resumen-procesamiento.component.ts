import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-resumen-procesamiento',
  templateUrl: './resumen-procesamiento.component.html',
  styleUrls: ['./resumen-procesamiento.component.css']
})
export class ResumenProcesamientoComponent implements OnInit {
  @Input() strTipoTransaccion: string;
  @Output() oVolverAlInicio = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  goBack(){
    this.oVolverAlInicio.emit();
  }

}

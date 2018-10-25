import { Component, OnInit, Input } from '@angular/core';
import { DatosGrilla} from 'src/app/layout/models/autogrid/datos-grilla'
import { Celda} from 'src/app/layout/models/autogrid/celda'
import { Cabecera} from 'src/app/layout/models/autogrid/cabecera'
import { Fila} from 'src/app/layout/models/autogrid/fila'

@Component({
  selector: 'autogrid',
  templateUrl: './autogrid.component.html',
  styleUrls: ['./autogrid.component.css']
})



export class AutogridComponent implements OnInit {
  // @Input() gridData:GridModel;
  constructor() { }

  ngOnInit() {
  }

}

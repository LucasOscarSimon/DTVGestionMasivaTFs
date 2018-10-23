import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
//import {NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerPopup } from '../datepicker-popup/datepicker-popup.component';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  @Input() transaccion:string;
  @Output() statusChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  abrirUpload(){
    this.statusChange.emit();
  }

}

import { Component, OnInit } from '@angular/core';

var consultaOn:boolean = false;
var resumenPreliminarOn:boolean = false;
var resumenProcesamientoOn:boolean = false;

@Component({
  selector: 'app-borrado-fts-masivo',
  templateUrl: './borrado-fts-masivo.component.html',
  styleUrls: ['./borrado-fts-masivo.component.css']
})
export class BorradoFtsMasivoComponent implements OnInit {
  transaccion:string = 'Borrado';
  constructor() { }

  ngOnInit() {
  }

}

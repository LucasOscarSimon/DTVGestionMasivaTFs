import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-importacion',
  templateUrl: './importacion.component.html',
  styleUrls: ['./importacion.component.css']
})



export class ImportacionComponent implements OnInit {
  @Output() statusChange = new EventEmitter();
  @Output() upload = new EventEmitter();
  constructor() {
   }

  ngOnInit() {  }

  abrirConsulta(){
    this.statusChange.emit();
  }

  cargarArchivo(){
    this.upload.emit();
  }

}

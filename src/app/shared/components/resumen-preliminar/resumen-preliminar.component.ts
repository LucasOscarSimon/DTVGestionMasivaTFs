import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-resumen-preliminar',
  templateUrl: './resumen-preliminar.component.html',
  styleUrls: ['./resumen-preliminar.component.css']
})
export class ResumenPreliminarComponent implements OnInit {
  @Output() confirmUpload = new EventEmitter();
  @Output() cancelUpload = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }   

  confirmarCarga(){
    this.confirmUpload.emit();
    this.cancelUpload.emit();
  }

  cancelarCarga(){
    this.cancelUpload.emit();
  }
  
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HeaderTable } from '../../../models/dynamic-table/header-table';
@Component({
  selector: 'app-resumen-preliminar',
  templateUrl: './resumen-preliminar.component.html',
  styleUrls: ['./resumen-preliminar.component.css']
})
export class ResumenPreliminarComponent implements OnInit {
  @Input() obeAjusteMasivo;
  @Input() registros: any[];
  @Input() cols: HeaderTable[];
  @Input() existeRegistrosInvalidos:boolean;
  @Output() confirmUpload = new EventEmitter();
  @Output() cancelUpload = new EventEmitter();
  @Output() stopUpload = new EventEmitter();
  dteFechaActual:Date=new Date();
  strMotivoImportacion:string="";
  es: any;
  constructor() { }

  errores;
  //SinErrores:boolean = this.obeAjusteMasivo.obeCabecera.NroRegistrosValidos < 0;
  mostrarAnular: boolean;

  ngOnInit() {
    this.errores = 1;
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
    }
  }

  // Método auxiliar para navegación
  mostrarSinErrores() {
    //this.SinErrores = true;
    this.errores = 0;
  }

  isLoading:boolean=false;
  confirmarCarga() {
    this.isLoading= true;
    this.confirmUpload.emit(this.strMotivoImportacion);
    this.mostrarAnular = true;
  }

  cancelarCarga() {
    this.isLoading= false;
    this.cancelUpload.emit();
  }

  anularCarga(){
    this.mostrarAnular = false;
    this.isLoading= false;
    this.stopUpload.emit();
  }
}

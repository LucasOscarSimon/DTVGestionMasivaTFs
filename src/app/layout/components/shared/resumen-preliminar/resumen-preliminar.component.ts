import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HeaderTable } from '../../../models/dynamic-table/header-table';
import { CabeceraGestionMasiva } from '../../../models/gestion-masiva/cabecera-gestion-masiva';
import { UtilTextHtml } from '../../util/util.text.html';

@Component({
  selector: 'app-resumen-preliminar',
  templateUrl: './resumen-preliminar.component.html',
  styleUrls: ['./resumen-preliminar.component.css']
})
export class ResumenPreliminarComponent implements OnInit {
  @Output() EEConfirmUpload = new EventEmitter();
  @Output() EECancelUpload = new EventEmitter();
  @Output() EEStopUpload = new EventEmitter();
  @Input() loHeadersResumenPreliminar: HeaderTable[];
  @Input() loDetalleInvalido: any[];//para que soporte los 3 procesos
  @Input() oCabeceraGestionMasiva:CabeceraGestionMasiva;
  @Input() bIsConfirmed:boolean;
  // @Input() registros: any[];// para la tabla de invalidos
  @Input() strTipoProcesoMasivo: string;
  @Input() bExisteRegistrosInvalidos:boolean;
  dteFechaActual:Date=new Date();
  strMotivoImportacion:string="";
  // bIsConfirmed:boolean=false;
  strInvalidMessage:string="";
  // es: any;
  constructor(private _UtilTextHtml: UtilTextHtml) { }

  // errores;
  //SinErrores:boolean = this.obeAjusteMasivo.obeCabecera.NroRegistrosValidos < 0;
  // mostrarAnular: boolean;

  ngOnInit() {
    this.strInvalidMessage = this._UtilTextHtml.GetTextInvalidRecordsPreliminarSummary();
    // this.errores = 1;
    // this.es = {
    //   firstDayOfWeek: 1,
    //   dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
    //   dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
    //   dayNamesMin: [ "D","L","M","X","J","V","S" ],
    //   monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
    //   monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
    //   today: 'Hoy',
    //   clear: 'Borrar'
    // }
  }

  // Método auxiliar para navegación
  mostrarSinErrores() {
    //this.SinErrores = true;
    // this.errores = 0;
  }

  isLoading:boolean=false;
  ConfirmUpload() {
    this.bIsConfirmed = true;
    this.isLoading= true;
    this.EEConfirmUpload.emit(this.strMotivoImportacion);
  }

  CancelUpload() {
    this.EECancelUpload.emit();
  }

  StopUpload(){
    this.bIsConfirmed = false;
    this.isLoading= false;
    this.EEStopUpload.emit();
  }
}

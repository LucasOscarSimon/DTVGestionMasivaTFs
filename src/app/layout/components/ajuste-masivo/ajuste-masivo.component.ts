import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AjusteMasivoService } from '../../services/ajuste-masivo/ajuste-masivo.service';
import { AjusteMasivo } from '../../models/ajuste-masivo/ajuste-masivo';
import { DetalleAjusteMasivo } from '../../models/ajuste-masivo/detalle-ajuste-masivo';
import { CabeceraAjusteMasivo } from '../../models/ajuste-masivo/cabecera-ajuste-masivo';
import { HeaderTable } from '../../models/dynamic-table/header-table';
import { UtilDTableAjusteMasivo } from '../util/util.dtable.ajuste-masivo';
import { UtilGestionMasiva } from '../util/util.gestion-masiva';
import { ArchivoImportado } from '../../models/importacion/archivo-importado';

@Component({
  selector: 'app-ajuste-masivo',
  templateUrl: './ajuste-masivo.component.html',
  styleUrls: ['./ajuste-masivo.component.css']
})


export class AjusteMasivoComponent implements OnInit {
  //Properties:
  bIsConsultaOn: boolean = false;
  bIsResumenPreliminarOn: boolean = false;
  bIsResumenProcesamientoOn: boolean = false;
  oArchivoImportado: ArchivoImportado;
  oAjusteMasivo: AjusteMasivo;
  loDetalleInvalidoAjusteMasivo: DetalleAjusteMasivo[];
  bExisteRegistrosInvalidos:boolean=false;
  numProgresoCarga:number=0;

  // Nombre de la gestión
  strTipoProcesoMasivo: string;
  loHeadersConsultaHistorial: HeaderTable[];// Headers enviados a la tabla de consulta
  loHeadersResumenPreliminar: HeaderTable[];// Headers enviados a la tabla de resumen preliminar para registros fallidos.

  constructor(private _AjusteMasivoService: AjusteMasivoService,
    private _UtilDTableAjusteMasivo: UtilDTableAjusteMasivo,
    private _UtilGestionMasiva: UtilGestionMasiva) { }

  ngOnInit() {
    this.loHeadersConsultaHistorial = this._UtilDTableAjusteMasivo.GetHeaderConsultaHistorialAjusteMasivo();
    this.loHeadersResumenPreliminar = this._UtilDTableAjusteMasivo.GetHeaderResumenPreliminarAjusteMasivo();
    this.strTipoProcesoMasivo = this._UtilGestionMasiva.GetNameProcesoAjusteMasivo();
  }

  SetArchivoImportado(oArchivoImportadoIn: ArchivoImportado) {
    this.oArchivoImportado = oArchivoImportadoIn;
  }

  UploadFileRecords() {
    // let errorLog: string[] = [];
    this.ValidateFileRecords();
  }

  ValidateFileRecords(){
    this.setDatosInicialesAjusteMasivo();
    let valid: boolean = true;
    let numRegistrosInvalidos=0;    
    this.numProgresoCarga=0;
    let sumaProgresoCarga = 1/this.oArchivoImportado.NroRegistrosArchivo;
    let oDetalle: DetalleAjusteMasivo;
    let oValue:any;
    for (let numFila = 0; numFila < this.oArchivoImportado.NroRegistrosArchivo; numFila++) {
      oDetalle = this.CreateDetalleAjusteMasivoInicial();
      valid = true;
      //Valido Id
      oValue=this.oArchivoImportado.loRegistros[numFila][0];
      if (isNaN(oValue)) {
        oDetalle.DescripcionError+="; El Id Cliente IBS no es un número.";
        valid = false;
      }else{
        oDetalle.IdClienteIBS=parseInt(oValue);
      }

      //Validar fecha (todavia no se como con typescript)
      oValue=this.oArchivoImportado.loRegistros[numFila][1];
      if (!this.IsADate(oValue)) {
        oDetalle.DescripcionError+="; La fecha de Ajuste no coincide con el formato dd/mm/yyyy.";
        valid = false;
      }else{
        oDetalle.FechaAjuste = oValue;
      }

      //Validar Batch Code
      oValue=this.oArchivoImportado.loRegistros[numFila][2];
      if(!this.IsAlphanumeric(oValue)){
        oDetalle.DescripcionError+="; El Batch Code no es alfanumérico.";
        valid = false;
      }else{
        oDetalle.FinanceBatchCode = oValue;
      }

      //Validar Ledger (requiero regex)
      oValue=this.oArchivoImportado.loRegistros[numFila][3];
      if(!this.IsAlphanumeric(oValue)){
        oDetalle.DescripcionError+="; El Ledger Account Code no es alfanumérico.";
        valid = false;
      }else{
        oDetalle.LedgerAccountCode = oValue;
      }

      //Validar Monto
      oValue=this.oArchivoImportado.loRegistros[numFila][4];
      if (isNaN(oValue)) {
        oDetalle.DescripcionError+="; El Monto de la transacción no es un número.";
        valid = false;
      }else{
        oDetalle.Monto = oValue;
      }

      //Validar Descripción Interna
      oValue=this.oArchivoImportado.loRegistros[numFila][5];
      oDetalle.DescripcionInterna = oValue;

      if (!valid) {
        numRegistrosInvalidos++;
        this.loDetalleInvalidoAjusteMasivo.push(oDetalle);
      }else{
        this.oAjusteMasivo.lobeDetalle.push(oDetalle);
      }
      this.numProgresoCarga+=sumaProgresoCarga;
    }
    this.oAjusteMasivo.obeCabecera.NroRegistrosInvalidos = numRegistrosInvalidos;
    this.oAjusteMasivo.obeCabecera.NroRegistrosValidos = 
        this.oAjusteMasivo.obeCabecera.NroRegistrosArchivo - numRegistrosInvalidos;
    if(numRegistrosInvalidos){
      this.bExisteRegistrosInvalidos=true;
    }
    this.MostrarResumenPreliminar();
  }

  MostrarResumenPreliminar(){
    this.bIsResumenPreliminarOn = true;
  }

  setDatosInicialesAjusteMasivo(){
    this.oAjusteMasivo = new AjusteMasivo();
    this.oAjusteMasivo.obeCabecera = new CabeceraAjusteMasivo();
    this.oAjusteMasivo.obeCabecera.NombreArchivo=this.oArchivoImportado.NombreArchivo;
    this.oAjusteMasivo.obeCabecera.UsuarioWindows="admin";//=====cambiar por el usuario windows logueado
    this.oAjusteMasivo.obeCabecera.NombreUsuario="Usuario Admin";//=====cambiar por el nombre del usuario logueado
    this.oAjusteMasivo.obeCabecera.Motivo="";
    this.oAjusteMasivo.obeCabecera.MontoTotal=0;
    this.oAjusteMasivo.obeCabecera.NroRegistrosArchivo=this.oArchivoImportado.NroRegistrosArchivo;
    this.oAjusteMasivo.obeCabecera.NroRegistrosValidos=0;
    this.oAjusteMasivo.obeCabecera.NroRegistrosInvalidos=0;
    this.oAjusteMasivo.lobeDetalle=[];
    this.loDetalleInvalidoAjusteMasivo =[];
    this.bExisteRegistrosInvalidos=false;
  }

  CreateDetalleAjusteMasivoInicial(): DetalleAjusteMasivo{
    let oDetalle = new DetalleAjusteMasivo();
    oDetalle.IdClienteIBS= 0;
    oDetalle.FechaAjuste= "";
    oDetalle.FinanceBatchId = 0;
    oDetalle.FinanceBatchCode = '';
    oDetalle.FinancialAccountId = 0;
    oDetalle.LedgerAccountId = 0;
    oDetalle.LedgerAccountCode = '';
    oDetalle.Monto = 0;
    oDetalle.DescripcionInterna = '';
    oDetalle.DescripcionError = "";
    return oDetalle;
  }

  confirmUpload(strMotivo){
    this.oAjusteMasivo.obeCabecera.Motivo=strMotivo;
    console.log(this.oAjusteMasivo);
    this._AjusteMasivoService.ProcesarArchivoAjusteMasivo(this.oAjusteMasivo)
          .subscribe(oAjusteMasivoResponse => {
            console.log("response");
            console.log(oAjusteMasivoResponse);
            this.oAjusteMasivo = oAjusteMasivoResponse;
            this.bIsResumenPreliminarOn = false;
            this.bIsResumenProcesamientoOn=true;
          });
  }

  stopUpload(){
    this.bIsResumenPreliminarOn = false;
    this.bIsResumenProcesamientoOn=true;
  }

  backToStart(){
    this.bIsResumenProcesamientoOn = false;
  }

  CleanFileRecords(){

  }

  IsADate(strFecha: string):boolean{
    if(strFecha){
      let partsDate = strFecha.split('/');
      if(partsDate && partsDate.length==3){
        let expRegularNum = /^([0-9])*$/;
        if(expRegularNum.test(partsDate[0]) && expRegularNum.test(partsDate[1]) &&
        expRegularNum.test(partsDate[2])){
          let dteFecha = this.GetStringDate(partsDate[0],partsDate[1], partsDate[2]);
          if(dteFecha){
            return true;
          }else{
            return false;
          }
        }else{
          return false;
        }
      }else{
        return false;
      }
    }
    return false;
  }

  GetStringDate(strDay: string, strMonth: string, strYear: string){
    return  new Date(strMonth + "/" + strDay + "/" + strYear);
  }

  IsAlphanumeric(strValor: string):boolean{
    let expRegularAlphanumeric = /[A-Za-z0-9_]/;
    if(expRegularAlphanumeric.test(strValor)){
      return true;
    }
    return false;
  }
}

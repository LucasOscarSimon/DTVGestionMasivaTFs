import { Component, OnInit } from '@angular/core';
import { AjusteMasivoService } from '../../services/ajuste-masivo/ajuste-masivo.service';
import { AjusteMasivo } from '../../models/ajuste-masivo/ajuste-masivo';
import { DetalleAjusteMasivo } from '../../models/ajuste-masivo/detalle-ajuste-masivo';
import { CabeceraAjusteMasivo } from '../../models/ajuste-masivo/cabecera-ajuste-masivo';
import { HeaderTable } from '../../models/dynamic-table/header-table';
import { UtilDTableAjusteMasivo } from '../util/util.dtable.ajuste-masivo';
import { UtilGestionMasiva } from '../util/util.gestion-masiva';
import { ArchivoImportado } from '../../models/importacion/archivo-importado';
import { RegistroAuditoria } from '../../models/consulta-auditoria/registro-auditoria';
import { FiltrosConsultaHistorial } from '../../models/consulta-historial/filtros-consulta-historial';


@Component({
  selector: 'app-ajuste-masivo',
  templateUrl: './ajuste-masivo.component.html',
  styleUrls: ['./ajuste-masivo.component.css']
})


export class AjusteMasivoComponent implements OnInit {
  //Properties:
  loHeadersConsultaHistorial: HeaderTable[];// Headers enviados a la tabla de consulta
  loHeadersResumen: HeaderTable[];// Headers enviados a la tabla de resumen preliminar para registros fallidos.
  loDetalleInvalidoAjusteMasivo: DetalleAjusteMasivo[];
  loRegistroAuditoriaSearched: RegistroAuditoria[];
  oArchivoImportado: ArchivoImportado;
  oAjusteMasivo: AjusteMasivo;
  bIsConsultaOn: boolean = false;
  bIsResumenPreliminarOn: boolean = false;
  bIsResumenProcesamientoOn: boolean = false;
  bExisteRegistrosInvalidos:boolean=false;
  bFieldValid:boolean;
  bIsConfirmed:boolean=false;
  numProgresoCarga:number=0;
  strTipoProcesoMasivo: string;// Nombre de la gestión

  constructor(private _AjusteMasivoService: AjusteMasivoService,
    private _UtilDTableAjusteMasivo: UtilDTableAjusteMasivo,
    private _UtilGestionMasiva: UtilGestionMasiva) { }

  ngOnInit() {
    this.loHeadersConsultaHistorial = this._UtilDTableAjusteMasivo.GetHeaderConsultaHistorialAjusteMasivo();
    this.loHeadersResumen = this._UtilDTableAjusteMasivo.GetHeaderResumenPreliminarAjusteMasivo();
    this.strTipoProcesoMasivo = this._UtilGestionMasiva.GetNameProcesoAjusteMasivo();
  }

  SetArchivoImportado(oArchivoImportadoIn: ArchivoImportado) {
    this.oArchivoImportado = oArchivoImportadoIn;
    console.log(this.oArchivoImportado);
  }

  UploadFileRecords() {
    // let errorLog: string[] = [];
    this.ValidateFileRecords();
  }

  
  ValidateFileRecords(){
    this.setDatosInicialesAjusteMasivo();
    let numRegistrosInvalidos=0;    
    this.numProgresoCarga=0;
    let sumaProgresoCarga = 1/this.oArchivoImportado.NroRegistrosArchivo;
    let oDetalle: DetalleAjusteMasivo;
    let oValue:any;
    let numMontoTotal=0;
    for (let numFila = 0; numFila < this.oArchivoImportado.NroRegistrosArchivo; numFila++) {
      oDetalle = this.CreateDetalleAjusteMasivoInicial();
      this.bFieldValid = true;
      //Validate Customer Id IBS
      oValue=this.oArchivoImportado.loRegistros[numFila][0];
      oDetalle=this.ValidateCustomerIdIBS(oValue,oDetalle);

      //ValidateAdjustmentDate
      oValue=this.oArchivoImportado.loRegistros[numFila][1];
      oDetalle=this.ValidateAdjustmentDate(oValue,oDetalle);
     
      //ValidateBatchCode
      oValue=this.oArchivoImportado.loRegistros[numFila][2];
      oDetalle=this.ValidateBatchCode(oValue,oDetalle);

      //ValidateLedgerAccount
      oValue=this.oArchivoImportado.loRegistros[numFila][3];
      oDetalle=this.ValidateLedgerAccount(oValue,oDetalle);

      //ValidateAmountFinancialTransaction
      oValue=this.oArchivoImportado.loRegistros[numFila][4];
      oDetalle=this.ValidateAmountFinancialTransaction(oValue,oDetalle);

      //Validar Descripción Interna
      oValue=this.oArchivoImportado.loRegistros[numFila][5];
      oDetalle.DescripcionInterna = oValue;

      numMontoTotal+=(oDetalle.Monto*1);
      if (!this.bFieldValid) {
        numRegistrosInvalidos++;
        this.loDetalleInvalidoAjusteMasivo.push(oDetalle);
      }else{
        this.oAjusteMasivo.lobeDetalle.push(oDetalle);
      }
      this.numProgresoCarga+=sumaProgresoCarga;
    }
    this.oAjusteMasivo.obeCabecera.MontoTotal = numMontoTotal;
    this.oAjusteMasivo.obeCabecera.NroRegistrosInvalidos = numRegistrosInvalidos;
    this.oAjusteMasivo.obeCabecera.NroRegistrosValidos = 
        this.oAjusteMasivo.obeCabecera.NroRegistrosArchivo - numRegistrosInvalidos;
    if(numRegistrosInvalidos){
      this.bExisteRegistrosInvalidos=true;
    }
    this.MostrarResumenPreliminar();
  }

  MostrarResumenPreliminar(){
    console.log(this.oAjusteMasivo);
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
    oDetalle.FechaAjuste= new Date();
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

  ConfirmUpload(strMotivo:string){
    this.bIsConfirmed=true;
    this.oAjusteMasivo.obeCabecera.Motivo=strMotivo;
    console.log(this.oAjusteMasivo);
    this._AjusteMasivoService.ProcesarArchivoAjusteMasivo(this.oAjusteMasivo)
          .subscribe(oAjusteMasivoResponse => {
            console.log("response");
            console.log(oAjusteMasivoResponse);
            this.EvaluateResponseProcessFile(oAjusteMasivoResponse);
          });
  }

  StopUpload(){
    this.bIsResumenPreliminarOn = false;
    this.bIsResumenProcesamientoOn=true;
  }

  CancelUpload(){
    this.bIsResumenPreliminarOn = false;
  }

  BackToStart(){
    this.bIsResumenProcesamientoOn = false;
    this.bIsConsultaOn=false;
  }

  CleanFileRecords(){
    this.oAjusteMasivo = null;
  }

  LookUpHistorial(){
    this.bIsConsultaOn=true;
  }

  SearchAdjustmentHistorial(oFiltrosConsultaHistorial: FiltrosConsultaHistorial){
    console.log("=============SearchAdjustmentHistorial===============");
    console.log(oFiltrosConsultaHistorial);
  }

  SearchAdjustmentHistorialDefault(){
    console.log("=============SearchAdjustmentHistorialDefault===============");
  }

  EvaluateResponseProcessFile(oAjusteMasivoResponse:AjusteMasivo){
    this.bIsConfirmed=false;
    if(oAjusteMasivoResponse){
      this.oAjusteMasivo = oAjusteMasivoResponse;
      this.bIsResumenPreliminarOn = false;
      this.bIsResumenProcesamientoOn=true;
    }else{
      //===recuperar valor catcheado en el servicio para pintarlo
    }
  }
  //===========VALIDATE FIELDS RECORDS FILE IMPORTED ======
  ValidateCustomerIdIBS(oValue: any, oDetalle: DetalleAjusteMasivo):DetalleAjusteMasivo{
    if (isNaN(oValue)) {
      oDetalle.DescripcionError+="; El Id Cliente IBS no es un número.";
      this.bFieldValid = false;
    }else{
      oDetalle.IdClienteIBS=parseInt(oValue);
    }
    return oDetalle;
  }

  ValidateAdjustmentDate(oValue:any, oDetalle: DetalleAjusteMasivo):DetalleAjusteMasivo{
    let dteFecha:Date = this._UtilGestionMasiva.GetDateFromString(oValue);
    if (!dteFecha) {
      oDetalle.DescripcionError+="; La fecha de Ajuste no coincide con el formato dd/mm/yyyy.";
      this.bFieldValid = false;
    }else{
      oDetalle.FechaAjuste = dteFecha;
    }
    return oDetalle;
  }

  ValidateBatchCode(oValue:any, oDetalle: DetalleAjusteMasivo):DetalleAjusteMasivo{
    if(oValue && !this._UtilGestionMasiva.IsAlphanumeric(oValue)){
      oDetalle.DescripcionError+="; El Batch Code no es alfanumérico.";
      this.bFieldValid = false;
    }else{
      oDetalle.FinanceBatchCode = oValue;
    }
    return oDetalle;
  }

  ValidateLedgerAccount(oValue:any, oDetalle: DetalleAjusteMasivo):DetalleAjusteMasivo{
    if(!this._UtilGestionMasiva.IsAlphanumeric(oValue)){
      oDetalle.DescripcionError+="; El Ledger Account Code no es alfanumérico.";
      this.bFieldValid = false;
    }else{
      oDetalle.LedgerAccountCode = oValue;
    }
    return oDetalle;
  }

  ValidateAmountFinancialTransaction(oValue:any, oDetalle: DetalleAjusteMasivo):DetalleAjusteMasivo{
    if (isNaN(oValue)) {
      oDetalle.DescripcionError+="; El Monto de la transacción no es un número.";
      this.bFieldValid = false;
    }else{
      oDetalle.Monto = oValue;
    }
    return oDetalle;
  }
}

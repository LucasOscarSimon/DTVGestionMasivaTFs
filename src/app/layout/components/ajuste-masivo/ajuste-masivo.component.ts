import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransaccionesFinancierasService } from 'src/app/layout/services/transacciones-financieras/transacciones-financieras.service'
import { AjusteMasivo } from '../../models/ajuste-masivo/ajuste-masivo';
import { DetalleAjusteMasivo } from '../../models/ajuste-masivo/detalle-ajuste-masivo';
import { CabeceraAjusteMasivo } from '../../models/ajuste-masivo/cabecera-ajuste-masivo';
import { HeaderTable } from '../../models/dynamic-table/header-table';

@Component({
  selector: 'app-ajuste-masivo',
  templateUrl: './ajuste-masivo.component.html',
  styleUrls: ['./ajuste-masivo.component.css']
})


export class AjusteMasivoComponent implements OnInit {
  consultaOn: boolean = false;
  resumenPreliminarOn: boolean = false;
  resumenProcesamientoOn: boolean = false;
  csvImportado: any;
  obeAjusteMasivo: AjusteMasivo;
  existeRegistrosInvalidos:boolean=false;
  progresoCarga:number=0;

  // Nombre de la gestión
  transaccion: any = { id: '2', name: 'Ajustes' }

  
  // Data dummy enviada a la tabla de detalle de errores del resumen preliminar  y de procesamiento
  registros: any = [
    {
      idIBSCliente: '00001', year: '29/10/2018', batch: '1', ledgerAccount: '105110R',
      monto: '1x23,20', descInterna: 'Ajuste de prueba', descError: 'El monto no es un número.'
    }
  ]

  // Headers enviados a la tabla de consulta
  headersConsulta: HeaderTable[] = [
    { field: 'id', header: 'Id' },
    { field: 'nombreArchivo', header: 'Nombre del Archivo' },
    { field: 'usuario', header: 'Usuario' },
    { field: 'nroRegArchivo', header: 'Nro. de Registros del Archivo' },
    { field: 'nroRegProcesados', header: 'Nro. de Registros Procesados' },
    { field: 'nroRegValidos', header: 'Nro. de Registros Válidos' },
    { field: 'nroRegFallidos', header: 'Nro. de Registros Fallidos' },
    { field: 'monto', header: 'Monto Total' },
    { field: 'fechaHora', header: 'Fecha y Hora' },
    { field: 'motivo', header: 'Motivo' },
    { field: 'estado', header: 'Estado' },
  ]
  // Headers enviados a la tabla de resumen preliminar para registros fallidos.
  headersPreliminarFallidos: HeaderTable[] = [
    { field: 'IdClienteIBS', header: 'Id IBS Cliente' },
    { field: 'FechaAjuste', header: 'Fecha Ajuste' },
    { field: 'FinanceBatchCode', header: 'Batch' },
    { field: 'LedgerAccountCode', header: 'Ledger Account' },
    { field: 'Monto', header: 'Monto' },
    { field: 'DescripcionInterna', header: 'Descripción Interna' },
    { field: 'DescripcionError', header: 'Descripción Error' }
  ]

  // Data dummy enviada a la tabla de detalle de errores del resumen preliminar  
  registrosConsulta: any = [
    {
      id: '3', nombreArchivo: 'Archivo.csv', usuario: 'PBLANCAS', nroRegArchivo: '1234',
      nroRegProcesados: '13523', nroRegValidos: '432', nroRegFallidos: '8462',
      monto: '13523', fechaHora: '432', motivo: '8462', estado:'procesado'
    }
  ]

  // Estados enviados a los drop down
  estados: any = [
    { name: 'Procesado' },
    { name: 'En Proceso' },
    { name: 'Cancelado' }
  ]

    constructor(private _transaccionesFinancierasService: TransaccionesFinancierasService) { }

  ngOnInit() {
  }

  cargarArchivo(csv) {
    this.csvImportado = csv;
  }

  validarCsv() {
    let errorLog: string[] = [];
    let valid: boolean = true;
    this.csvImportado.invalidRegs=0;    
    this.progresoCarga=0;
    let sumaProgresoCarga = 1/this.csvImportado.lines.length;
    for (let e = 1; e < this.csvImportado.lines.length; e++) {
      valid = true;
      //Valido Id
      if (isNaN(this.csvImportado.lines[e][0])) {
        errorLog.push("Error en fila: " + e + " Columna: " + 0 + " || " + this.csvImportado.lines[e][0] + " no es un numero");
        valid = false;
      }
      //Validar fecha (todavia no se como con typescript)

      //Validar binario
      if (this.csvImportado.lines[e][2] != "1" && this.csvImportado.lines[e][2] != "0") {
        errorLog.push("Error en fila: " + e + " Columna: " + 2 + " || " + this.csvImportado.lines[e][2] + " no es un binario");
        valid = false;
      }

      //Validar Ledger (requiero regex)

      //Validar Monto
      if (isNaN(this.csvImportado.lines[e][4])) {
        errorLog.push("Error en fila: " + e + " Columna: " + 4 + " || " + this.csvImportado.lines[e][4] + " no es un numero");
        valid = false;
      }
      if (valid) {
        this.csvImportado.validRegs++;
      }else{
        this.csvImportado.invalidRegs++;
        this.existeRegistrosInvalidos=true;
      }
      this.progresoCarga+=sumaProgresoCarga;
    }
    this.csvImportado.ErrorLog = errorLog;
    if (valid) {
      this.convertirCsv(this.csvImportado);
    }
    console.log(errorLog);
  }

  convertirCsv(objetoPadre) {
    this.setDatosInicialesAjusteMasivo(objetoPadre);
    for (let e = 1; e < objetoPadre.lines.length; e++) {
      this.obeAjusteMasivo.obeCabecera.MontoTotal += parseFloat(objetoPadre.lines[e][4]);
      this.obeAjusteMasivo.lobeDetalle.
                  push(this.createDetalleAjusteMasivo(objetoPadre.lines[e]));
    }
    this.resumenPreliminarOn = true;
  }

  subirAjustes() {
    this._transaccionesFinancierasService.subirAjustesCsv(this.obeAjusteMasivo);
  }

  setDatosInicialesAjusteMasivo(objetoPadre){
    this.obeAjusteMasivo = new AjusteMasivo();
    this.obeAjusteMasivo.obeCabecera = new CabeceraAjusteMasivo();
    this.obeAjusteMasivo.obeCabecera.NombreArchivo=objetoPadre.fileName;
    this.obeAjusteMasivo.obeCabecera.UsuarioWindows="admin";
    this.obeAjusteMasivo.obeCabecera.NombreUsuario="Usuario Admin";
    this.obeAjusteMasivo.obeCabecera.Motivo="";
    this.obeAjusteMasivo.obeCabecera.MontoTotal=0;
    this.obeAjusteMasivo.obeCabecera.NroRegistrosArchivo=objetoPadre.lines.length - 1;
    this.obeAjusteMasivo.obeCabecera.NroRegistrosProcesados=0;
    this.obeAjusteMasivo.obeCabecera.NroRegistrosValidos=objetoPadre.validRegs;
    this.obeAjusteMasivo.obeCabecera.NroRegistrosFallidos=objetoPadre.invalidRegs;
    this.obeAjusteMasivo.lobeDetalle=[];
  }

  createDetalleAjusteMasivo(objDetalle): DetalleAjusteMasivo{
    let oDetalle = new DetalleAjusteMasivo();
    oDetalle.IdClienteIBS= objDetalle[0];
    oDetalle.FechaAjuste= new Date();// objDetalle[1];
    oDetalle.FinanceBatchId = 0;
    oDetalle.FinanceBatchCode = objDetalle[2];
    oDetalle.FinancialAccountId = 0;
    oDetalle.LedgerAccountId = 0;
    oDetalle.LedgerAccountCode = objDetalle[3];
    oDetalle.Monto = objDetalle[4];
    oDetalle.DescripcionInterna = objDetalle[5];
    oDetalle.DescripcionError = "";
    return oDetalle;
  }

  

  confirmUpload(strMotivo){
    this.obeAjusteMasivo.obeCabecera.Motivo=strMotivo;
    console.log(this.obeAjusteMasivo);
    this._transaccionesFinancierasService.subirAjustesCsv(this.obeAjusteMasivo)
          .subscribe(obeAjusteMasivoResponse => {
            console.log("response");
            console.log(obeAjusteMasivoResponse);
            this.obeAjusteMasivo = obeAjusteMasivoResponse;
            this.resumenPreliminarOn = false;
            this.resumenProcesamientoOn=true;
          });
  }

  stopUpload(){
    this.resumenPreliminarOn = false;
    this.resumenProcesamientoOn=true;
  }

  backToStart(){
    this.resumenProcesamientoOn = false;
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransaccionesFinancierasService } from 'src/app/layout/services/transacciones-financieras/transacciones-financieras.service';
import { AjusteMasivo } from '../../models/ajuste-masivo/ajuste-masivo';
import { DetalleAjusteMasivo } from '../../models/ajuste-masivo/detalle-ajuste-masivo';
import { CabeceraAjusteMasivo } from '../../models/ajuste-masivo/cabecera-ajuste-masivo';

@Component({
  selector: 'app-ajuste-masivo',
  templateUrl: './ajuste-masivo.component.html',
  styleUrls: ['./ajuste-masivo.component.css']
})


export class AjusteMasivoComponent implements OnInit {

  constructor(private _transaccionesFinancierasService: TransaccionesFinancierasService) { }
      consultaOn = false;
      resumenPreliminarOn = false;
      resumenProcesamientoOn = false;
      csvImportado: any;
      obeAjusteMasivo: AjusteMasivo;
      existeRegistrosInvalidos = false;
      progresoCarga = 0;

  // Nombre de la gestión
  transaccion: any = { id: '2', name: 'Ajustes' };

  // Data dummy enviada a la tabla de detalle de errores del resumen preliminar y de procesamiento
  registros: any = [
    {
      idIBSCliente: '00001', year: '29/10/2018', batch: '1', ledgerAccount: '105110R',
      monto: '1x23,20', descInterna: 'Ajuste de prueba', descError: 'El monto no es un número.'
    }
  ];
  // Data dummy enviada a la tabla de detalle de errores del resumen preliminar
  registrosConsulta: any = [
    {
      id: '3', nombreArchivo: 'Archivo.csv', usuario: 'PBLANCAS', nroRegArchivo: '1234',
      nroRegProcesados: '13523', nroRegValidos: '432', nroRegFallidos: '8462',
      monto: '13523', fechaHora: '432', motivo: '8462', estado: 'procesado'
    }
  ];

  // Headers enviados a la tabla de consulta
  colsConsulta: any = [
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
  ];

  // Estados enviados a los drop down
  estados: any = [
    { name: 'Procesado' },
    { name: 'En Proceso' },
    { name: 'Cancelado' }
  ];

  // Headers enviados a la tabla de detalle de errores del resumen preliminar y de procesamiento
  cols: any = [
    { field: 'IdClienteIBS', header: 'Id IBS Cliente' },
    { field: 'FechaAjuste', header: 'Fecha Ajuste' },
    { field: 'FinanceBatchCode', header: 'Batch' },
    { field: 'LedgerAccountCode', header: 'Ledger Account' },
    { field: 'Monto', header: 'Monto' },
    { field: 'DescripcionInterna', header: 'Descripción Interna' },
    { field: 'DescripcionError', header: 'Descripción Error' }
  ];

  ngOnInit() {
  }

  cargarArchivo(csv) {
    this.csvImportado = csv;
  }

  validarFecha(date: string) {
    const re = '/^[0-3]?[0-9]\/[01]?[0-9]\/[12][90][0-9][0-9]$/';

    if (date !== '' && !date.match(re)) {
      return false;
    }
    return true;
  }

  validarCsv() {
    const errorLog: string[] = [];
    let valido = true;
    this.csvImportado.invalidRegs = 0;
    this.progresoCarga = 0;
    const sumaProgresoCarga = 1 / this.csvImportado.lines.length;
    for (let e = 1; e < this.csvImportado.lines.length; e++) {
      valido = true;
      // Valido Id
      if (isNaN(this.csvImportado.lines[e][0])) {
        errorLog.push('Error en fila: ' + e + ' Columna: ' + 0 + ' || ' + this.csvImportado.lines[e][0] + ' no es un numero');
        valido = false;
      }
      // Validar fecha (todavia no se como con typescript)
      if (isNaN(this.csvImportado.lines[e][1]) || this.validarFecha(this.csvImportado.lines[e][1])) {
        errorLog.push('Error en fila: ' + e + ' Columna: ' + 1 + ' || ' + this.csvImportado.lines[e][1] + ' no es una fecha valida');
        valido = false;
      }

      // Validar binario
      if (this.csvImportado.lines[e][2] !== '1' && this.csvImportado.lines[e][2] !== '0') {
        errorLog.push('Error en fila: ' + e + ' Columna: ' + 2 + ' || ' + this.csvImportado.lines[e][2] + ' no es un binario');
        valido = false;
      }

      // Validar Ledger (requiero regex)

      // Validar Monto
      if (isNaN(this.csvImportado.lines[e][4]) && this.csvImportado.lines[e][4] < 0) {
        errorLog.push('Error en fila: ' + e + ' Columna: ' + 4 + ' || ' + this.csvImportado.lines[e][4] + ' no es un monto valido');
        valido = false;
      }
      if (valido) {
        this.csvImportado.validRegs++;
      } else {
        this.csvImportado.invalidRegs++;
        this.existeRegistrosInvalidos = true;
      }
      this.progresoCarga += sumaProgresoCarga;
    }
    this.csvImportado.ErrorLog = errorLog;
    if (valido) {
      this.convertirCsv(this.csvImportado);
    }
    console.log(errorLog);
  }

  subirAjustes() {
    this._transaccionesFinancierasService.subirAjustesCsv(this.obeAjusteMasivo);
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

  setDatosInicialesAjusteMasivo(objetoPadre) {
    this.obeAjusteMasivo = new AjusteMasivo();
    this.obeAjusteMasivo.obeCabecera = new CabeceraAjusteMasivo();
    this.obeAjusteMasivo.obeCabecera.NombreArchivo = objetoPadre.fileName;
    this.obeAjusteMasivo.obeCabecera.UsuarioWindows = 'admin';
    this.obeAjusteMasivo.obeCabecera.NombreUsuario = 'Usuario Admin';
    this.obeAjusteMasivo.obeCabecera.Motivo = '';
    this.obeAjusteMasivo.obeCabecera.MontoTotal = 0;
    this.obeAjusteMasivo.obeCabecera.NroRegistrosArchivo = objetoPadre.lines.length - 1;
    this.obeAjusteMasivo.obeCabecera.NroRegistrosProcesados = 0;
    this.obeAjusteMasivo.obeCabecera.NroRegistrosValidos = objetoPadre.validRegs;
    this.obeAjusteMasivo.obeCabecera.NroRegistrosFallidos = objetoPadre.invalidRegs;
    this.obeAjusteMasivo.lobeDetalle = [];
  }

  createDetalleAjusteMasivo(objDetalle): DetalleAjusteMasivo {
    const oDetalle = new DetalleAjusteMasivo();
    oDetalle.IdClienteIBS = objDetalle[0];
    oDetalle.FechaAjuste = new Date(); // objDetalle[1];
    oDetalle.FinanceBatchId = 0;
    oDetalle.FinanceBatchCode = objDetalle[2];
    oDetalle.FinancialAccountId = 0;
    oDetalle.LedgerAccountId = 0;
    oDetalle.LedgerAccountCode = objDetalle[3];
    oDetalle.Monto = objDetalle[4];
    oDetalle.DescripcionInterna = objDetalle[5];
    oDetalle.DescripcionError = '';
    return oDetalle;
  }

  confirmUpload(strMotivo) {
    this.obeAjusteMasivo.obeCabecera.Motivo = strMotivo;
    console.log(this.obeAjusteMasivo);
    this._transaccionesFinancierasService.subirAjustesCsv(this.obeAjusteMasivo)
          .subscribe(obeAjusteMasivoResponse => {
            console.log('response');
            console.log(obeAjusteMasivoResponse);
            this.obeAjusteMasivo = obeAjusteMasivoResponse;
            this.resumenPreliminarOn = false;
            this.resumenProcesamientoOn = true;
          });
  }

  stopUpload() {
    this.resumenPreliminarOn = false;
    this.resumenProcesamientoOn = true;
  }

  backToStart() {
    this.resumenProcesamientoOn = false;
  }
}

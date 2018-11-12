import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Called components
// import { ImportacionComponent } from '../shared/importacion/importacion.component'
// import { ConsultaComponent } from '../shared/consulta/consulta.component'
// import { ResumenPreliminarComponent } from '../shared/resumen-preliminar/resumen-preliminar.component'
// import { ResumenProcesamientoComponent } from '../shared/resumen-procesamiento/resumen-procesamiento.component'

const consultaOn = false;
const resumenPreliminarOn = false;
const resumenProcesamientoOn = false;
@Component({
  selector: 'app-borrado-fts-masivo',
  templateUrl: './borrado-fts-masivo.component.html',
  styleUrls: ['./borrado-fts-masivo.component.css']
})
export class BorradoFtsMasivoComponent implements OnInit {
  transaccion: any = { id: '1', name: 'Borrados' };

  // Headers enviados a la tabla de detalle de errores del resumen preliminar y de procesamiento
  cols: any = [
    { field: 'idIBSFt', header: 'Id IBS Transaccion Financiera' },
    { field: 'idIBSCliente', header: 'Id IBS Cliente' },
    { field: 'error', header: 'Descripción del Error' }
  ];
  // Data dummy enviada a la tabla de detalle de errores del resumen preliminar.
  registros: any = [
    {
      idIBSFt: '00001', idIBSCliente: '00008', error: 'El Id del TFS no es un número'
    }
  ];
  // Data dummy enviada a la tabla de detalle de errores del resumen de procesamiento
  registrosProcesamiento: any = [
    {
      idIBSFt: '00001', idIBSCliente: '00008', error: 'No se encontró el Ledger Account'
    }
  ];

  // Headers enviados a la tabla de detalle del borrado masivo
  colsDetalle: any = [
    { field: 'idIBSFt', header: 'Id IBS Transaccion Financiera' },
    { field: 'idIBSCliente', header: 'Id IBS Cliente' },
    { field: 'estado', header: 'Estado' }
  ];
  // Data dummy enviada a la tabla de detalle del borrado masivo
  registrosDetalle: any = [
    {
      idIBSFt: '00001', idIBSCliente: '00008', estado: 'Procesado'
    }
  ];

  // Headers enviados a la tabla de reporte
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
  // Data dummy enviada a la tabla de reporte
  registrosConsulta: any = [
    {
      id: '3', nombreArchivo: 'Archivo.csv', usuario: 'PBLANCAS', nroRegArchivo: '1234',
      nroRegProcesados: '13523', nroRegValidos: '432', nroRegFallidos: '0',
      monto: '13523,32', fechaHora: '08/11/2018 11:00', motivo: 'Motivo del ajuste Masivo', estado: 'Procesado'
    }
  ];

  // Estados enviados a los drop down
    estados: any = [
    { name: 'Procesado' },
    { name: 'En Proceso' },
    { name: 'Procesado y Anulado' }
  ];
  constructor() { }

  ngOnInit() {
  }

}

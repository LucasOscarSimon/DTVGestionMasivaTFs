import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TransaccionesFinancierasService } from 'src/app/layout/services/transacciones-financieras/transacciones-financieras.service'
import { RegistroAuditoria } from '../../models/consulta-auditoria/registro-auditoria';

@Component({
  selector: 'app-consulta-auditoria',
  templateUrl: './consulta-auditoria.component.html',
  styleUrls: ['./consulta-auditoria.component.css']
})


export class ConsultaAuditoriaComponent implements OnInit {
  constructor(private _TransaccionesFinancierasService: TransaccionesFinancierasService) { }


  // Procesos
  procesos: any = [
    { name: 'Gestión Ajuste Masivo' },
    { name: 'Gestión Pago Masivo' },
    { name: 'Gestión Borrado Masivo' }
  ];

  // Headers enviados a la tabla de reporte
  colsConsulta: any = [
    { field: 'id', header: 'Id' },
    { field: 'nombreArchivo', header: 'Nombre del Archivo' },
    { field: 'usuario', header: 'Usuario' },
    { field: 'proceso', header: 'Proceso' },
    { field: 'nroRegArchivo', header: 'Nro. de Registros del Archivo' },
    { field: 'nroRegProcesados', header: 'Nro. de Registros Procesados' },
    { field: 'nroRegValidos', header: 'Nro. de Registros Válidos' },
    { field: 'nroRegFallidos', header: 'Nro. de Registros Fallidos' },
    { field: 'monto', header: 'Monto Total' },
    { field: 'fechaHora', header: 'Fecha y Hora' },
    { field: 'motivo', header: 'Motivo' },
    { field: 'estado', header: 'Estado' },
  ];
  // Data dummy enviada a la tabla de detalle de errores del resumen preliminar
  registrosConsulta: any = [
    {
      id: '3', nombreArchivo: 'Archivo.csv', usuario: 'PBLANCAS', nroRegArchivo: '1234',
      proceso: 'Gestión Borrado Masivo', nroRegProcesados: '13523', nroRegValidos: '432',
      nroRegFallidos: '8462', monto: '13523', fechaHora: '432', motivo: '8462', estado: 'procesado'
    }
  ];

  // Estados enviados a los drop down
  estados: any = [
    { name: 'Procesado' },
    { name: 'En Proceso' },
    { name: 'Cancelado' }
  ];

  dteFechaInicio = new Date();
  dteFechaFin = new Date();
  strNombreArchivo = '';
  numTipoProceso = 0;
  numEstado = 0;

  loRegistrosAuditoria: RegistroAuditoria[];


  ngOnInit() {
    this.LoadRegistrosAuditoria();
  }

  DetalleBorrado() {
  }

  LoadRegistrosAuditoria() {
    this._TransaccionesFinancierasService.ConsultarRegistrosAuditoria('admin',
        this.dteFechaInicio.toLocaleDateString(),
        this.dteFechaFin.toLocaleDateString(), this.strNombreArchivo,
        this.numEstado, this.numTipoProceso)
        .subscribe(loRegistros => {
          console.log('response');
          console.log(loRegistros);
          this.loRegistrosAuditoria = loRegistros;
        });
  }
}

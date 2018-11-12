import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pago-masivo',
  templateUrl: './pago-masivo.component.html',
  styleUrls: ['./pago-masivo.component.css']
})
export class PagoMasivoComponent implements OnInit {
  constructor() { }

  // Nombre de la gestión
  transaccion: any = { id: '3', name: 'Pagos' };

  // Headers enviados a la tabla de detalle de errores del resumen preliminar y de procesamiento
  cols: any = [
    { field: 'idIBSCliente', header: 'Id IBS Cliente' },
    { field: 'year', header: 'Fecha Transacción' },
    { field: 'ledgerAccount', header: 'Ledger Account' },
    { field: 'monto', header: 'Monto' },
    { field: 'descInterna', header: 'Descripción Interna' },
    { field: 'invoiceLineText', header: 'Invoice Line Text' },
    { field: 'descError', header: 'Descripción Error' }
  ];
  // Data dummy enviada a la tabla de detalle de errores del resumen preliminar  y de procesamiento
  registros: any = [
    {
      idIBSCliente: '00001', year: '29/10/2018', ledgerAccount: '105110R', monto: '1x23,20',
      descInterna: 'Pago de prueba', invoiceLineText: 'Prueba', descError: 'El monto no es un número.'
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
  // Data dummy enviada a la tabla de detalle de errores del resumen preliminar
  registrosConsulta: any = [
    {
      id: '3', nombreArchivo: 'Archivo.csv', usuario: 'PBLANCAS', nroRegArchivo: '1234',
      nroRegProcesados: '13523', nroRegValidos: '432', nroRegFallidos: '8462',
      monto: '13523', fechaHora: '432', motivo: '8462', estado: 'procesado'
    }
  ];

  // Estados enviados a los drop down
  estados: any = [
    { name: 'Procesado' },
    { name: 'En Proceso' },
    { name: 'Cancelado' }
  ];

  uploadedFiles: any[] = [];

  fileReaded: any;

  ngOnInit() {
  }

  onBeforeUpload(event) {
    console.log('++++++++++++++ onBeforeUpload ++++++++++++');
    console.log(event);
  }

  onBeforeSend(event) {
    console.log('++++++++++++++ onBeforeSend ++++++++++++');
    console.log(event);
  }

  onUpload(event) {
    console.log('++++++++++++++ onUpload ++++++++++++');
    console.log(event);

    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  onError(event) {
    console.log('++++++++++++++ onError ++++++++++++');
    console.log(event);
  }

  onClear(event) {
    console.log('++++++++++++++ onClear ++++++++++++');
    console.log(event);
  }

  onSelect(event) {
    console.log('++++++++++++++ onSelect ++++++++++++');
    console.log(event);
  }

  onProgress(event) {
    console.log('++++++++++++++ onProgress ++++++++++++');
    console.log(event);
  }

  uploadHandler(event) {
    console.log('++++++++++++++ uploadHandler ++++++++++++');
    console.log(event);
    // event.files = [];
  }

  csv2Array(fileInput: any) {
    // read file from input
    this.fileReaded = fileInput.target.files[0];

    const reader: FileReader = new FileReader();
    reader.readAsText(this.fileReaded);

    reader.onload = (e) => {
      const csv: any = reader.result;
      const allTextLines = csv.split(/\r|\n|\r/);
      const headers = allTextLines[0].split(';');
      const lines = [];

      this.makeConversion(allTextLines, headers, lines);

      console.log('>>>>>>>>>>>>>>>>>', lines);
      };

  }

  private makeConversion(allTextLines: any, headers: any, lines: any[]) {
    for (let i = 0; i < allTextLines.length; i++) {
      if (allTextLines[i]) {
        const data = allTextLines[i].split(';');
        if (data.length === headers.length) {
          const tarr = [];
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }
          lines.push(tarr);
        }
      }
    }
  }
}

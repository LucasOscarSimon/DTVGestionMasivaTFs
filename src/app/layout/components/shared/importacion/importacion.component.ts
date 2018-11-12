import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-importacion',
  templateUrl: './importacion.component.html',
  styleUrls: ['./importacion.component.css']
})

export class ImportacionComponent implements OnInit {
  constructor() {
  }
  @Output() archivoCargado = new EventEmitter();
  @Output() upload = new EventEmitter();
  @Input() transaccion: any[];
  @Input() progresoCarga: number;
  // Para Navegacion a consulta
  @Output() statusChange = new EventEmitter();
  fileNameUpload = 'Seleccione su archivo CSV';

  uploadedFiles: any[] = [];
  fileReaded: any;

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
    const fullpath = '' + fileInput.target.value;
    const filename = fullpath.substring(fullpath.lastIndexOf('\\') + 1);
    console.log(filename);
    this.fileNameUpload = filename;

    const reader: FileReader = new FileReader();
    reader.readAsText(this.fileReaded);

    reader.onload = (e) => {
      const csv: any = reader.result;
      const allTextLines = csv.split(/\r|\n|\r/);
      const headers = allTextLines[0].split(';');
      const obeArchivoLeido = {
        lines: [],
        fileName: filename,
        validRegs : 0,
        ErrorLog : []
      };

      this.makeConversion(allTextLines, headers, obeArchivoLeido);

      this.archivoCargado.emit(obeArchivoLeido);
    };
  }

  private makeConversion(allTextLines: any, headers: any, obeArchivoLeido: { lines: any[]; fileName: string; validRegs: number; ErrorLog: any[]; }) {
    for (let i = 0; i < allTextLines.length; i++) {
      if (allTextLines[i]) {
        // split content based on comma
        const data = allTextLines[i].split(';');
        if (data.length === headers.length) {
          const tarr = [];
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }
          // log each row to see output
          obeArchivoLeido.lines.push(tarr);
        }
      }
      // all rows in the csv file
    }
  }

  ngOnInit() { }

  abrirConsulta() {
    this.statusChange.emit();
  }

  cargarArchivo() {
    this.upload.emit();
  }

}

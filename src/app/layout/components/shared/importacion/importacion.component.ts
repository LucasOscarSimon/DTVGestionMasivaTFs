import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-importacion',
  templateUrl: './importacion.component.html',
  styleUrls: ['./importacion.component.css']
})

export class ImportacionComponent implements OnInit {
  @Output() archivoCargado = new EventEmitter();
  @Output() upload = new EventEmitter();
  @Input() transaccion : any[];
  @Input() progresoCarga : number;
  // Para Navegacion a consulta
  @Output() statusChange = new EventEmitter();
  fileNameUpload: string="Seleccione su archivo CSV";
  

  uploadedFiles: any[] = [];

  onBeforeUpload(event) {
    console.log("++++++++++++++ onBeforeUpload ++++++++++++");
    console.log(event);
  }

  onBeforeSend(event) {
    console.log("++++++++++++++ onBeforeSend ++++++++++++");
    console.log(event);
  }

  onUpload(event) {
    console.log("++++++++++++++ onUpload ++++++++++++");
    console.log(event);

    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  onError(event) {
    console.log("++++++++++++++ onError ++++++++++++");
    console.log(event);
  }

  onClear(event) {
    console.log("++++++++++++++ onClear ++++++++++++");
    console.log(event);
  }

  onSelect(event) {
    console.log("++++++++++++++ onSelect ++++++++++++");
    console.log(event);
  }

  onProgress(event) {
    console.log("++++++++++++++ onProgress ++++++++++++");
    console.log(event);
  }

  uploadHandler(event) {
    console.log("++++++++++++++ uploadHandler ++++++++++++");
    console.log(event);
    //event.files = [];
  }

  /* convertFile(event) {
    console.log("++++++++++++++ convertFile ++++++++++++");
    console.log(event);
    const input = document.getElementById('fileInput');
    //if (inputValue) {
    //  var startIndex = (inputValue.indexOf('\\') >= 0 ? inputValue.lastIndexOf('\\') : inputValue.lastIndexOf('/'));
    //  var filename = inputValue.substring(startIndex);
    //  if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
    //    filename = filename.substring(1);
    //  }
    //  alert(filename);
    //}


    const reader = new FileReader();
    reader.onload = () => {
      let text = reader.result;
      //console.log('CSV: ', text.substring(0, 100) + '...');

      //convert text to json here
      //var json = this.csvJSON(text);
    };
    //reader.readAsText(input.files[0]);
  } */

  fileReaded: any;
  csv2Array(fileInput: any) {
    //read file from input
    this.fileReaded = fileInput.target.files[0];
    var fullpath = "" + fileInput.target.value;
    var filename = fullpath.substring(fullpath.lastIndexOf("\\") + 1);
    console.log(filename);
    this.fileNameUpload = filename;
    

    let reader: FileReader = new FileReader();
    reader.readAsText(this.fileReaded);

    reader.onload = (e) => {
      let csv: any = reader.result;
      let allTextLines = csv.split(/\r|\n|\r/);
      let headers = allTextLines[0].split(';');
      let obeArchivoLeido = {
        lines: [],
        fileName: filename,
        validRegs : 0,
        ErrorLog : []
      }

      for (let i = 0; i < allTextLines.length; i++) {
        if (allTextLines[i]) {
          // split content based on comma
          let data = allTextLines[i].split(';');
          if (data.length === headers.length) {
            let tarr = [];
            for (let j = 0; j < headers.length; j++) {
              tarr.push(data[j]);
            }

            // log each row to see output 
            obeArchivoLeido.lines.push(tarr);
          }
        }
        // all rows in the csv file 

      }

      this.archivoCargado.emit(obeArchivoLeido);
    }

  }
  constructor() {
  }

  ngOnInit() { }

  abrirConsulta() {
    this.statusChange.emit();
  }

  cargarArchivo() {
    this.upload.emit();
  }

}

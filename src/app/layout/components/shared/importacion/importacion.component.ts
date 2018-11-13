import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilTextHtml } from '../../util/util.text.html';
import { ArchivoImportado } from '../../../models/importacion/archivo-importado';

@Component({
  selector: 'app-importacion',
  templateUrl: './importacion.component.html',
  styleUrls: ['./importacion.component.css']
})

export class ImportacionComponent implements OnInit {
  @Output() EESetArchivoImportado = new EventEmitter();
  @Output() EEUploadFileRecords = new EventEmitter();
  @Input() strTipoProcesoMasivo : string;
  @Input() numProgresoCarga : number;
  // Para Navegacion a consulta
  @Output() statusChange = new EventEmitter();
  strFileNameUpload: string;

  uploadedFiles: any[] = [];
  oFileReaded: any;
  oArchivoImportado:ArchivoImportado;

  constructor(private _UtilTextHtml: UtilTextHtml) {
  }

  ngOnInit() { 
    this.strFileNameUpload = this._UtilTextHtml.GetTextFileNameUpload();
  }
  // onBeforeUpload(event) {
  //   console.log("++++++++++++++ onBeforeUpload ++++++++++++");
  //   console.log(event);
  // }

  // onBeforeSend(event) {
  //   console.log("++++++++++++++ onBeforeSend ++++++++++++");
  //   console.log(event);
  // }

  onUpload(event) {
    console.log("++++++++++++++ onUpload ++++++++++++");
    console.log(event);

    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  // onError(event) {
  //   console.log("++++++++++++++ onError ++++++++++++");
  //   console.log(event);
  // }

  // onClear(event) {
  //   console.log("++++++++++++++ onClear ++++++++++++");
  //   console.log(event);
  // }

  // onSelect(event) {
  //   console.log("++++++++++++++ onSelect ++++++++++++");
  //   console.log(event);
  // }

  // onProgress(event) {
  //   console.log("++++++++++++++ onProgress ++++++++++++");
  //   console.log(event);
  // }

  // uploadHandler(event) {
  //   console.log("++++++++++++++ uploadHandler ++++++++++++");
  //   console.log(event);
  //   //event.files = [];
  // }

  
  ImportFileCSV(oFileInput: any) {
    //read file from input
    // this.fileReaded = fileInput.target.files[0];
    // var fullpath = "" + fileInput.target.value;
    // var filename = fullpath.substring(fullpath.lastIndexOf("\\") + 1);
    // console.log(filename);
    // this.strFileNameUpload = filename;
    this.GetInfoFileImport(oFileInput);
    if(this.oFileReaded){
      this.ConvertCSVToArray();
      if(this.oArchivoImportado){
        this.EmitEvent_SetArchivoImportado();
      }
    }
    // let reader: FileReader = new FileReader();
    // reader.readAsText(this.fileReaded);

    // reader.onload = (e) => {
    //   let csv: any = reader.result;
    //   let allTextLines = csv.split(/\r|\n|\r/);
    //   let headers = allTextLines[0].split(';');
    //   let obeArchivoLeido = {
    //     lines: [],
    //     fileName: filename,
    //     validRegs : 0,
    //     ErrorLog : []
    //   }

    //   for (let i = 0; i < allTextLines.length; i++) {
    //     if (allTextLines[i]) {
    //       // split content based on comma
    //       let data = allTextLines[i].split(';');
    //       if (data.length === headers.length) {
    //         let tarr = [];
    //         for (let j = 0; j < headers.length; j++) {
    //           tarr.push(data[j]);
    //         }

    //         // log each row to see output 
    //         obeArchivoLeido.lines.push(tarr);
    //       }
    //     }
    //     // all rows in the csv file 

    //   }

    //   this.archivoCargado.emit(obeArchivoLeido);
    // }

  }
  
  GetInfoFileImport(oFileImport: any){
     //read file from input
     this.oFileReaded = oFileImport.target.files[0];
     var strFullpath = "" + oFileImport.target.value;
     var strFilename = strFullpath.substring(strFullpath.lastIndexOf("\\") + 1);
     console.log(strFilename);
     this.strFileNameUpload = strFilename;
     this.InicializarArchivoImportado();
  }

  InicializarArchivoImportado(){
    this.oArchivoImportado= new ArchivoImportado();
    this.oArchivoImportado.NombreArchivo = this.strFileNameUpload;
    this.oArchivoImportado.loRegistros =[];
    this.oArchivoImportado.NroRegistrosArchivo = 0;
  }
  
  ConvertCSVToArray(){
    let reader: FileReader = new FileReader();
    reader.readAsText(this.oFileReaded);

    reader.onload = (e) => {
      let csv: any = reader.result;
      let allTextLines = csv.split(/\r|\n|\r/);
      let headers = allTextLines[0].split(';');

      if(allTextLines && allTextLines.length>1){
        for (let i = 1; i < allTextLines.length; i++) {
          if (allTextLines[i]) {
            // split content based on comma
            let data = allTextLines[i].split(';');
            if (data.length === headers.length) {
              let tarr = [];
              for (let j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
              }
              // push each row
              this.oArchivoImportado.loRegistros.push(tarr);
            }
          }
        }
      }
      
    }
    this.oArchivoImportado.NroRegistrosArchivo = this.oArchivoImportado.loRegistros.length;
  }

  EmitEvent_SetArchivoImportado(){
    this.EESetArchivoImportado.emit(this.oArchivoImportado);
  }

  LookUpHistorial() {
    this.statusChange.emit();
  }

  UploadFileRecords() {
    this.EEUploadFileRecords.emit();
  }

  CleanFileRecords(){

  }
}

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
  @Output() EECleanFileRecords = new EventEmitter();
  @Output() EELookUpHistorial = new EventEmitter();
  @Input() strTipoProcesoMasivo : string;
  @Input() numProgresoCarga : number;
  oFileReaded: any;
  oArchivoImportado:ArchivoImportado;
  strFileNameUpload: string;

  constructor(private _UtilTextHtml: UtilTextHtml) {
  }

  ngOnInit() { 
    this.strFileNameUpload = this._UtilTextHtml.GetTextFileNameUpload();
  }

  // onUpload(event) {
  //   console.log("++++++++++++++ onUpload ++++++++++++");
  //   console.log(event);

  //   // for (let file of event.files) {
  //   //   // this.uploadedFiles.push(file);
  //   // }
  // }

  ImportFileCSV(oFileInput: any) {
    this.GetInfoFileImport(oFileInput);
    if(this.oFileReaded){
      this.ConvertCSVToArray();
    }
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
      this.oArchivoImportado.NroRegistrosArchivo = this.oArchivoImportado.loRegistros.length;
      if(this.oArchivoImportado){
        this.EmitEvent_SetArchivoImportado();
      }
    }
  }

  EmitEvent_SetArchivoImportado(){
    this.EESetArchivoImportado.emit(this.oArchivoImportado);
  }

  LookUpHistorial() {
    this.EELookUpHistorial.emit();
  }

  UploadFileRecords() {
    this.EEUploadFileRecords.emit();
  }
  
}

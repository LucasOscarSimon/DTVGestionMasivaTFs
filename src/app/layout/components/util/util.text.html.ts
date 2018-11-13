import { Injectable } from "@angular/core";
const TEXT_FILE_NAME_UPLOAD = "Seleccione su archivo CSV";
const TEXT_INVALID_RECORDS_SUMMARY = 
        `Los registros fallidos deben ser subsanados y 
        cargar un archivos nuevo. La carga no procede`;

@Injectable()
export class UtilTextHtml {
    GetTextFileNameUpload():string{
        return TEXT_FILE_NAME_UPLOAD;
    }

    GetTextInvalidRecordsPreliminarSummary():string{
        return TEXT_INVALID_RECORDS_SUMMARY;
    }
}
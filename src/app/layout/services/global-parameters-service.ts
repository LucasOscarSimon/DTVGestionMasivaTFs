import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GlobalParametersService {
    public urlBaseWebAPI:string =(this.getHostName());

    private getHostName():string{
        var urlHost='';
        var host = window.location.origin;
        var hostName = window.location.hostname;
        if(hostName=="127.0.0.1" || hostName=="localhost"){
            urlHost = "http://localhost:55342/";
        }else{
            urlHost = host + "/GTFMasivaWebAPI/";
        }
        return urlHost;
    }

    getUrlBaseWebAPI() {
        return this.urlBaseWebAPI;
    }

    getHttpOptions(){
        return httpOptions;
    }

    log(msj){
        console.log(msj);
    }

    handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
        
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
        
            // Let the app keep running by returning an empty result.
            return of(result as T);
        }
    }
    
}
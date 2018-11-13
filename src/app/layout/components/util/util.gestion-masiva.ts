import { Injectable } from "@angular/core";

const PROCESO_AJUSTE_MASIVO ="Gestión Ajuste Masivo";
const PROCESO_PAGO_MASIVO ="Gestión Pago Masivo";
const PROCESO_BORRADO_MASIVO ="Gestión Borrado Masivo";

@Injectable()
export class UtilGestionMasiva {
    GetNameProcesoAjusteMasivo():string{
        return PROCESO_AJUSTE_MASIVO;
    }

    GetNameProcesoPagoMasivo():string{
        return PROCESO_PAGO_MASIVO;
    }

    GetNameProcesoBorradoMasivo():string{
        return PROCESO_BORRADO_MASIVO;
    }

    IsADate(strFecha: string):boolean{
      if(strFecha){
        let partsDate = strFecha.split('/');
        if(partsDate && partsDate.length==3){
          let expRegularNum = /^([0-9])*$/;
          if(expRegularNum.test(partsDate[0]) && expRegularNum.test(partsDate[1]) &&
          expRegularNum.test(partsDate[2])){
            let dteFecha = this.GetStringDate(partsDate[0],partsDate[1], partsDate[2]);
            if(dteFecha){
              return true;
            }else{
              return false;
            }
          }else{
            return false;
          }
        }else{
          return false;
        }
      }
      return false;
    }

    GetDateFromString(strFecha: string):Date{
      if(strFecha){
        let partsDate = strFecha.split('/');
        if(partsDate && partsDate.length==3){
          let expRegularNum = /^([0-9])*$/;
          if(expRegularNum.test(partsDate[0]) && expRegularNum.test(partsDate[1]) &&
          expRegularNum.test(partsDate[2])){
            let dteFecha = this.GetStringDate(partsDate[0],partsDate[1], partsDate[2]);
            return dteFecha;
          }else{
            return null;
          }
        }else{
          return null;
        }
      }
      return null;
    }
    
    private GetStringDate(strDay: string, strMonth: string, strYear: string):Date{
      return  new Date(strMonth + "/" + strDay + "/" + strYear);
    }
  
    IsAlphanumeric(strValor: string):boolean{
      let expRegularAlphanumeric = /[A-Za-z0-9_]/;
      if(expRegularAlphanumeric.test(strValor)){
        return true;
      }
      return false;
    }

    GetSpanishLocale():any{
      return {
          firstDayOfWeek: 1,
          dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
          dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
          dayNamesMin: [ "D","L","M","X","J","V","S" ],
          monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
          monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
          today: 'Hoy',
          clear: 'Borrar'
        };
    }
}
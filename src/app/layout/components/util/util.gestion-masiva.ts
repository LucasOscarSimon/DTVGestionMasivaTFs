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
}
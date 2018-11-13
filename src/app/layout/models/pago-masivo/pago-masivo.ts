import { CabeceraPagoMasivo } from '../../models/pago-masivo/cabecera-pago-masivo';
import { DetallePagoMasivo } from '../../models/pago-masivo/detalle-pago-masivo';
export class PagoMasivo {
    obeCabecera: CabeceraPagoMasivo;
    lobeDetalle: DetallePagoMasivo[];
}

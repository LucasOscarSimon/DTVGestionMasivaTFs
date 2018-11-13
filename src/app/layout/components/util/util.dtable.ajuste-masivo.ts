import { Injectable } from "@angular/core";
import { HeaderTable } from '../../models/dynamic-table/header-table';

@Injectable()
export class UtilDTableAjusteMasivo {
    headersConsultaHistorial: HeaderTable[];
    headersResumenPreliminar: HeaderTable[];

    GetHeaderConsultaHistorialAjusteMasivo(){
        this.headersConsultaHistorial = [
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

        return this.headersConsultaHistorial;
    }

    GetHeaderResumenPreliminarAjusteMasivo(){
        this.headersResumenPreliminar = [
            { field: 'IdClienteIBS', header: 'Id IBS Cliente' },
            { field: 'FechaAjuste', header: 'Fecha Ajuste' },
            { field: 'FinanceBatchCode', header: 'Batch' },
            { field: 'LedgerAccountCode', header: 'Ledger Account' },
            { field: 'Monto', header: 'Monto' },
            { field: 'DescripcionInterna', header: 'Descripción Interna' },
            { field: 'DescripcionError', header: 'Descripción Error' }
          ];

        return this.headersResumenPreliminar;
    }


}
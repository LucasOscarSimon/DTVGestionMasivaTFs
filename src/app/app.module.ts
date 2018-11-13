//********** Módulos de Angular ***** */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//********** FORMS MODULE */
import { FormsModule } from '@angular/forms';

//********** Routing Pages ********/
import { AppRoutingModule } from './app-routing/app-routing.module';

//********** Animation Module Angular for PrimeNg */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//********** Módulos externos ******/
import {NgbDatepickerModule,NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {FileUploadModule} from 'primeng/fileupload';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {ProgressBarModule} from 'primeng/progressbar';

//********** Components ********/
//********** General Components */
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

//********** Specific Components */
import { LoginComponent } from './layout/components/login/login.component';
import { HomeComponent } from './layout/components/home/home.component';
import { AjusteMasivoComponent } from './layout/components/ajuste-masivo/ajuste-masivo.component';
import { PagoMasivoComponent } from './layout/components/pago-masivo/pago-masivo.component';
import { BorradoFtsMasivoComponent } from './layout/components/borrado-fts-masivo/borrado-fts-masivo.component';
import { ConsultaAuditoriaComponent } from './layout/components/consulta-auditoria/consulta-auditoria.component';
import { ImportacionComponent } from './layout/components/shared/importacion/importacion.component';
import { ConsultaComponent } from './layout/components/shared/consulta/consulta.component';
import { ResumenPreliminarComponent } from './layout/components/shared/resumen-preliminar/resumen-preliminar.component';
import { ResumenProcesamientoComponent } from './layout/components/shared/resumen-procesamiento/resumen-procesamiento.component';
import { NgbdDatepickerPopup } from './layout/components/shared/datepicker-popup/datepicker-popup.component';
import { AutogridComponent } from './layout/components/shared/autogrid/autogrid.component';
import { DynamicTableComponent } from './layout/components/shared/dynamic-table/dynamic-table.component';

//********** Global Providers */
import { GlobalEventsManager } from './layout/services/global-events-manager';
import { GlobalParametersService } from './layout/services/global-parameters-service';

//********** IMPORT HTTP */
import { HttpClientModule }    from '@angular/common/http';

//********** IMPORT SERVICES */
import { LoginService } from './layout/services/login/login.service'
import { AjusteMasivoService } from './layout/services/ajuste-masivo/ajuste-masivo.service';
import { BorradoMasivoService } from './layout/services/borrado-masivo/borrado-masivo.service';
import { ConsultaAuditoriaService } from './layout/services/consulta-auditoria/consulta-auditoria.service';
import { ConsultaHistorialService } from './layout/services/consulta-historial/consulta-historial.service';
import { PagoMasivoService } from './layout/services/pago-masivo/pago-masivo.service';

//********** IMPORT UTIL COMPONENT SERVICES */
import { UtilDTableAjusteMasivo } from './layout/components/util/util.dtable.ajuste-masivo';
import { UtilDTableBorradoMasivo } from './layout/components/util/util.dtable.borrado-masivo';
import { UtilDTableConsultaAuditoria } from './layout/components/util/util.dtable.consulta-auditoria';
import { UtilDTableGestionMasiva } from './layout/components/util/util.dtable.gestion-masiva';
import { UtilDTablePagoMasivo } from './layout/components/util/util.dtable.pago-masivo';
import { UtilGestionMasiva } from './layout/components/util/util.gestion-masiva';
import { UtilTextHtml } from './layout/components/util/util.text.html';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AjusteMasivoComponent,
    PagoMasivoComponent,
    BorradoFtsMasivoComponent,
    ConsultaAuditoriaComponent,
    HeaderComponent,
    FooterComponent,
    ImportacionComponent,
    ConsultaComponent,
    DynamicTableComponent,
    ResumenPreliminarComponent,
    ResumenProcesamientoComponent,
    NgbdDatepickerPopup,
    AutogridComponent,
    HomeComponent
  ],
  imports: [
    //******* Hace posible la exportacion de los componentes */
    BrowserModule,
    //******* Hace posible el enlace entre las propiedades y los inputs */
    FormsModule,
    //******* Aqui poner los Componentes Importados de ng-bootstrap */
    NgbPaginationModule, 
    NgbAlertModule,
    NgbDatepickerModule,
    //******* Aqui el animation module de Angular para uso de componentes PrimeNg*/
    BrowserAnimationsModule,
    //******* Aqui poner los Componentes Importados de PrimeNg */
    PanelModule,
    CardModule,
    FileUploadModule,
    InputTextModule,
    DropdownModule,
    SplitButtonModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    ProgressBarModule,
    //******** Para el uso de los HTTP */
    HttpClientModule,
    //******* Aqui poner el modulo de Ruteo principal */
    AppRoutingModule
  ],
  providers: [
    //********** Global Providers */
    GlobalEventsManager,
    GlobalParametersService,
    //********** IMPORT SERVICES */
    LoginService,
    AjusteMasivoService,
    BorradoMasivoService,
    ConsultaAuditoriaService,
    ConsultaHistorialService,
    PagoMasivoService,
    //********** IMPORT UTIL COMPONENT SERVICES */
    UtilDTableAjusteMasivo,
    UtilDTableBorradoMasivo,
    UtilDTableConsultaAuditoria,
    UtilDTableGestionMasiva,
    UtilDTablePagoMasivo,
    UtilGestionMasiva,
    UtilTextHtml,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

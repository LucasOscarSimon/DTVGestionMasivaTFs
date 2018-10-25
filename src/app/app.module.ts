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

//********** Global Providers */
import { GlobalEventsManager } from './layout/services/global-events-manager';
import { TestComponentsComponent } from './test-components/test-components.component';


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
    ResumenPreliminarComponent,
    ResumenProcesamientoComponent,
    NgbdDatepickerPopup,
    AutogridComponent,
    HomeComponent,
    TestComponentsComponent
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
    //******* Aqui poner el modulo de Ruteo principal */
    AppRoutingModule
  ],
  providers: [
    GlobalEventsManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

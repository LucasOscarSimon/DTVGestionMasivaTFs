//********** Módulos de Angular ***** */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//********** FORMS MODULE */
import { FormsModule } from '@angular/forms';

//********** Routing Pages ********/
import { AppRoutingModule } from './app-routing/app-routing.module';

//********** Módulos externos ******/
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

//********** Components ********/
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { LoginComponent } from './layout/components/login/login.component';
import { AjusteMasivoComponent } from './layout/components/ajuste-masivo/ajuste-masivo.component';
import { PagoMasivoComponent } from './layout/components/pago-masivo/pago-masivo.component';
import { BorradoFtsMasivoComponent } from './layout/components/borrado-fts-masivo/borrado-fts-masivo.component';
import { ConsultaAuditoriaComponent } from './layout/components/consulta-auditoria/consulta-auditoria.component';
import { ImportacionComponent } from './shared/components/importacion/importacion.component';
import { ConsultaComponent } from './shared/components/consulta/consulta.component';
import { ResumenPreliminarComponent } from './shared/components/resumen-preliminar/resumen-preliminar.component';
import { ResumenProcesamientoComponent } from './shared/components/resumen-procesamiento/resumen-procesamiento.component';


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
    ResumenProcesamientoComponent
  ],
  imports: [
    //******* Hace posible la exportacion de los componentes */
    BrowserModule,
    //******* Hace posible el enlace entre las propiedades y los inputs */
    FormsModule,
    //******* Aqui poner los Componentes Importados de ng-bootstrap */
    NgbPaginationModule, 
    NgbAlertModule,
    //******* Aqui poner el modulo de Ruteo principal */
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

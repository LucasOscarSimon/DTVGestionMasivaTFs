import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from '../layout/components/login/login.component';
import { HomeComponent } from '../layout/components/home/home.component';
import { AjusteMasivoComponent } from '../layout/components/ajuste-masivo/ajuste-masivo.component';
import { ConsultaAuditoriaComponent } from '../layout/components/consulta-auditoria/consulta-auditoria.component';
import { ResumenProcesamientoComponent } from '../layout/components/shared/resumen-procesamiento/resumen-procesamiento.component';
import { ResumenPreliminarComponent } from '../layout/components/shared/resumen-preliminar/resumen-preliminar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'ajuste-masivo', component: AjusteMasivoComponent },
  { path: 'consulta-auditoria', component: ConsultaAuditoriaComponent },
  { path: 'resumen-procesamiento', component: ResumenProcesamientoComponent },
  { path: 'resumen-preliminar', component: ResumenPreliminarComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }

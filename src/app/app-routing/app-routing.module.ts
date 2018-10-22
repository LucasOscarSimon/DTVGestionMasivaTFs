import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from '../layout/components/login/login.component';
import { AjusteMasivoComponent } from '../layout/components/ajuste-masivo/ajuste-masivo.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'ajuste-masivo', component: AjusteMasivoComponent },
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }

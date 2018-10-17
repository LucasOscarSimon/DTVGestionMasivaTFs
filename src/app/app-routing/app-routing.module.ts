import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
//import { InicioComponent } from './components/inicio/inicio.component';


const routes: Routes = [
  //{ path: 'inicio', component: InicioComponent },
  { path: '**', redirectTo: 'inicio' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }

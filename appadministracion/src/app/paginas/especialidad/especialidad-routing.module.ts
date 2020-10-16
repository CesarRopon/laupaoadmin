import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EspecialidadPage } from './especialidad.page';

const routes: Routes = [
  {
    path: '',
    component: EspecialidadPage
  },
  {
    path: 'updateespecialidad',
    loadChildren: () => import('./updateespecialidad/updateespecialidad.module').then( m => m.UpdateespecialidadPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspecialidadPageRoutingModule {}

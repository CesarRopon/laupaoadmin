import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateespecialidadPage } from './updateespecialidad.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateespecialidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateespecialidadPageRoutingModule {}

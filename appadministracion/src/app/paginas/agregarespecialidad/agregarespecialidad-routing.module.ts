import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarespecialidadPage } from './agregarespecialidad.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarespecialidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarespecialidadPageRoutingModule {}

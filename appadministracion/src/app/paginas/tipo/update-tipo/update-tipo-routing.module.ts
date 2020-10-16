import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateTipoPage } from './update-tipo.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateTipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateTipoPageRoutingModule {}

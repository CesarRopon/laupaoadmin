import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarTipoPage } from './agregar-tipo.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarTipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarTipoPageRoutingModule {}

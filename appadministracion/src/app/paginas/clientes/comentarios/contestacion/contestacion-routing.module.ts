import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContestacionPage } from './contestacion.page';

const routes: Routes = [
  {
    path: '',
    component: ContestacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContestacionPageRoutingModule {}

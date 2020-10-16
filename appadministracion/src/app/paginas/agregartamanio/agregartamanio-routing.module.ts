import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregartamanioPage } from './agregartamanio.page';

const routes: Routes = [
  {
    path: '',
    component: AgregartamanioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregartamanioPageRoutingModule {}

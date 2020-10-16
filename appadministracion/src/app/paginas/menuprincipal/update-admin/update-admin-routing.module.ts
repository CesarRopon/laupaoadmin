import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateAdminPage } from './update-admin.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateAdminPageRoutingModule {}

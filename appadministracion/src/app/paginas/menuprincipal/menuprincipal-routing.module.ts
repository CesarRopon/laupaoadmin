import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuprincipalPage } from './menuprincipal.page';

const routes: Routes = [
  {
    path: '',
    component: MenuprincipalPage
  },
  {
    path: 'update-admin',
    loadChildren: () => import('./update-admin/update-admin.module').then( m => m.UpdateAdminPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuprincipalPageRoutingModule {}

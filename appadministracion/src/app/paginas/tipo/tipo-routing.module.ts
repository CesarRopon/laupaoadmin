import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoPage } from './tipo.page';

const routes: Routes = [
  {
    path: '',
    component: TipoPage
  },
  {
    path: 'update-tipo',
    loadChildren: () => import('./update-tipo/update-tipo.module').then( m => m.UpdateTipoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoPageRoutingModule {}

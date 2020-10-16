import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TamanioPage } from './tamanio.page';

const routes: Routes = [
  {
    path: '',
    component: TamanioPage
  },
  {
    path: 'update',
    loadChildren: () => import('./update/update.module').then( m => m.UpdatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TamanioPageRoutingModule {}

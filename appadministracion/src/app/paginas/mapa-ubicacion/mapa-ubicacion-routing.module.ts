import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaUbicacionPage } from './mapa-ubicacion.page';

const routes: Routes = [
  {
    path: '',
    component: MapaUbicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaUbicacionPageRoutingModule {}

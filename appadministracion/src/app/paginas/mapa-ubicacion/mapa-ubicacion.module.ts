import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaUbicacionPageRoutingModule } from './mapa-ubicacion-routing.module';

import { MapaUbicacionPage } from './mapa-ubicacion.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaUbicacionPageRoutingModule
  ],
  declarations: [MapaUbicacionPage]
})
export class MapaUbicacionPageModule {}

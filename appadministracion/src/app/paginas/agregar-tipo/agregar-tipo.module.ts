import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarTipoPageRoutingModule } from './agregar-tipo-routing.module';

import { AgregarTipoPage } from './agregar-tipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarTipoPageRoutingModule
  ],
  declarations: [AgregarTipoPage]
})
export class AgregarTipoPageModule {}

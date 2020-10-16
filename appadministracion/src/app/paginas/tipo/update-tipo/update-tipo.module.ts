import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateTipoPageRoutingModule } from './update-tipo-routing.module';

import { UpdateTipoPage } from './update-tipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateTipoPageRoutingModule
  ],
  declarations: [UpdateTipoPage]
})
export class UpdateTipoPageModule {}

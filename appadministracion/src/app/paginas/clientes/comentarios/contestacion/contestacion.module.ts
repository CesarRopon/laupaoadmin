import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContestacionPageRoutingModule } from './contestacion-routing.module';

import { ContestacionPage } from './contestacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContestacionPageRoutingModule
  ],
  declarations: [ContestacionPage]
})
export class ContestacionPageModule {}

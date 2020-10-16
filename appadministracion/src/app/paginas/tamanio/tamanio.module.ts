import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TamanioPageRoutingModule } from './tamanio-routing.module';

import { TamanioPage } from './tamanio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TamanioPageRoutingModule
  ],
  declarations: [TamanioPage]
})
export class TamanioPageModule {}

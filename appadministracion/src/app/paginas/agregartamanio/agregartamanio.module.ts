import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregartamanioPageRoutingModule } from './agregartamanio-routing.module';

import { AgregartamanioPage } from './agregartamanio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregartamanioPageRoutingModule
  ],
  declarations: [AgregartamanioPage]
})
export class AgregartamanioPageModule {}

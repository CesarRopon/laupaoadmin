import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarespecialidadPageRoutingModule } from './agregarespecialidad-routing.module';

import { AgregarespecialidadPage } from './agregarespecialidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarespecialidadPageRoutingModule
  ],
  declarations: [AgregarespecialidadPage]
})
export class AgregarespecialidadPageModule {}

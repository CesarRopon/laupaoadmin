import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateespecialidadPageRoutingModule } from './updateespecialidad-routing.module';

import { UpdateespecialidadPage } from './updateespecialidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateespecialidadPageRoutingModule
  ],
  declarations: [UpdateespecialidadPage]
})
export class UpdateespecialidadPageModule {}

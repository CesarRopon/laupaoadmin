import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateAdminPageRoutingModule } from './update-admin-routing.module';

import { UpdateAdminPage } from './update-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateAdminPageRoutingModule
  ],
  declarations: [UpdateAdminPage]
})
export class UpdateAdminPageModule {}

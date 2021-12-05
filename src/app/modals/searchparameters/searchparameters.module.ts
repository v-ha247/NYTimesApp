import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchparametersPageRoutingModule } from './searchparameters-routing.module';

import { SearchparametersPage } from './searchparameters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchparametersPageRoutingModule
  ],
  declarations: [SearchparametersPage]
})
export class SearchparametersPageModule {}

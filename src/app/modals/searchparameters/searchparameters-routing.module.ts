import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchparametersPage } from './searchparameters.page';

const routes: Routes = [
  {
    path: '',
    component: SearchparametersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchparametersPageRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'searchparameters',
    loadChildren: () => import('./modals/searchparameters/searchparameters.module').then( m => m.SearchparametersPageModule)
  },
  {
    path: 'searchdetails',
    loadChildren: () => import('./modals/searchdetails/searchdetails.module').then( m => m.SearchdetailsPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

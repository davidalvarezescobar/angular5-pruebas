import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { PagesService } from './pages.service';

export const routes: Routes = [
  { path: '', loadChildren: './nwe-init/nwe-init.module#NweInitModule' },
  { path: 'listado-de-cobros', loadChildren: './listado-de-cobros/listado-de-cobros.module#ListadoDeCobrosModule' },
  { path: 'listado-programados', loadChildren: './listado-programados/listado-programados.module#ListadoProgramadosModule' },
  { path: 'alta-de-cobros', loadChildren: './alta-de-cobros/alta-de-cobros.module#AltaDeCobrosModule' },
  { path: 'detalle-de-recibo', loadChildren: './detalle-recibo/detalle-recibo.module#DetalleReciboModule' },
  { path: '**', loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true, preloadingStrategy: PreloadAllModules})
  ],
  providers: [
    PagesService
  ],
  exports: [RouterModule]
})
export class PagesModule { }

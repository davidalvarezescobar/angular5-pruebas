import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PagesService } from './pages.service';
import { InternalRoutes } from './../services/constants';

import { TabViewModule } from 'primeng/tabview';
import { ComponentsModule } from './../components/components.module';
import { OperacionesPendienteFirmaComponent } from './pending-signs/operaciones-pendientes-firma/operaciones-pendiente-firma.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: InternalRoutes.login , loadChildren: './login/login.module#LoginModule' },
  { path: InternalRoutes.buscadorContratos , loadChildren: './buscador-contratos/buscador-contratos.module#BuscadorContratosModule' },
  { path: InternalRoutes.buscadorCuentas , loadChildren: './buscador-cuentas/buscador-cuentas.module#BuscadorCuentasModule' },
  // tslint:disable-next-line:max-line-length
  { path: InternalRoutes.seleccionCuentaCargo , loadChildren: './seleccion-cuenta-cargo/seleccion-cuenta-cargo.module#SeleccionCuentaCargoModule' },
  { path: InternalRoutes.detalleRecibo , loadChildren: './detalle-recibo/detalle-recibo.module#DetalleReciboModule' },
  { path: InternalRoutes.resultadoFirma , loadChildren: './resultado-firma/resultado-firma.module#ResultadoFirmaModule' },
  { path: 'operaciones-pendientes' , component: OperacionesPendienteFirmaComponent},
  // tslint:disable-next-line:max-line-length
  { path: InternalRoutes.ordenesPendientesFirma , loadChildren: './pending-signs/ordenes-pendientes-firma/ordenes-pendientes-firma.module#OrdenesPendientesFirmaModule' },
  { path: '**', loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true, preloadingStrategy: PreloadAllModules}),
    ComponentsModule,
    TabViewModule
  ],
  declarations: [OperacionesPendienteFirmaComponent],
  providers: [PagesService],
  exports: [RouterModule]
})
export class PagesModule { }

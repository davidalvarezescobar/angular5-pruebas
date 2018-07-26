import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/primeng';
import { RouterModule, Routes } from '@angular/router';
import { OrdenesPendientesFirmaComponent } from './ordenes-pendientes-firma.component';
import { SituacionFirmaComponent } from '../situacion-firma/situacion-firma.component';

const ROUTES: Routes = [
  { path: '', component: OrdenesPendientesFirmaComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    OverlayPanelModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [OrdenesPendientesFirmaComponent, SituacionFirmaComponent],
  exports: [RouterModule]
})
export class OrdenesPendientesFirmaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../components/shared.module';

import { DetalleReciboService } from './detalle-recibo.service';
import { DetalleReciboComponent } from './detalle-recibo/detalle-recibo.component';

const ROUTES: Routes = [
  { path: '', component: DetalleReciboComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [DetalleReciboComponent],
  providers: [DetalleReciboService]
})
export class DetalleReciboModule { }

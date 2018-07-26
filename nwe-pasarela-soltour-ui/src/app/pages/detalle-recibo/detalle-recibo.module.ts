import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule, Routes } from '@angular/router';

import { DetalleReciboComponent } from './detalle-recibo.component';

const ROUTES: Routes = [
  { path: '', component: DetalleReciboComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [DetalleReciboComponent]
})
export class DetalleReciboModule { }

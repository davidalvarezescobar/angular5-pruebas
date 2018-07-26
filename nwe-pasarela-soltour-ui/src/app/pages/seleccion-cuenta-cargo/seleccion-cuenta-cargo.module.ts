import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeleccionCuentaCargoComponent } from './seleccion-cuenta-cargo.component';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

const ROUTES: Routes = [
  { path: '', component: SeleccionCuentaCargoComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ComponentsModule,
    FormsModule,
    DropdownModule,
  ],
  declarations: [SeleccionCuentaCargoComponent],
  exports: [RouterModule]
})
export class SeleccionCuentaCargoModule { }

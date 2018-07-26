import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorCuentasComponent } from './buscador-cuentas.component';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';

const ROUTES: Routes = [
  { path: '', component: BuscadorCuentasComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ComponentsModule,
    InputTextModule,
    CalendarModule,
    ReactiveFormsModule
  ],
  declarations: [BuscadorCuentasComponent],
  exports: [RouterModule]
})
export class BuscadorCuentasModule { }

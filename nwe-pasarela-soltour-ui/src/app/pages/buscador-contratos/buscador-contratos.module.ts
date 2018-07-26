import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorContratosComponent } from './buscador-contratos.component';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '', component: BuscadorContratosComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [BuscadorContratosComponent],
  exports: [RouterModule]
})
export class BuscadorContratosModule { }

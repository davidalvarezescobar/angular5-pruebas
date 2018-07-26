import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';

import { ResultadoFirmaComponent } from './resultado-firma.component';

const ROUTES: Routes = [
  { path: '', component: ResultadoFirmaComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ComponentsModule
  ],
  declarations: [ResultadoFirmaComponent]
})
export class ResultadoFirmaModule { }

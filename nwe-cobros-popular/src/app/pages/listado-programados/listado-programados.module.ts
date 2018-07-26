import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../components/shared.module';
import { PipesModule } from './../../pipes/pipes.module';
import { CalendarModule } from 'primeng/primeng';
import { FormatContractAccountPipe } from './../../pipes/format-contract-account/format-contract-account.pipe';
import { FormatCurrencyEuroPipe } from './../../pipes/format-currency-euro/format-currency-euro.pipe';

import { ListadoProgramadosService } from './listado-programados.service';
import { ListadoProgramadosComponent } from './listado-programados/listado-programados.component';
import { FiltrosListadoProgramadosComponent } from './components/filtros-listado-programados/filtros-listado-programados.component';
import { TablaListadoProgramadosComponent } from './components/tabla-listado-programados/tabla-listado-programados.component';
import { DatePipe } from '@angular/common';


const ROUTES: Routes = [
  { path: '', component: ListadoProgramadosComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    SharedModule,
    PipesModule,
    CalendarModule
  ],
  declarations: [
    ListadoProgramadosComponent,
    FiltrosListadoProgramadosComponent,
    TablaListadoProgramadosComponent
  ],
  providers: [
    ListadoProgramadosService,
    FormatContractAccountPipe,
    DatePipe,
    FormatCurrencyEuroPipe
  ]
})
export class ListadoProgramadosModule { }

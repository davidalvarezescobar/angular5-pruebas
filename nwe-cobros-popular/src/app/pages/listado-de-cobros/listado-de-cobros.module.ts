import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';

import { SharedModule } from './../../components/shared.module';
import { PipesModule } from './../../pipes/pipes.module';
import { FormatContractAccountPipe } from './../../pipes/format-contract-account/format-contract-account.pipe';
import { FormatCurrencyEuroPipe } from './../../pipes/format-currency-euro/format-currency-euro.pipe';
import { ListadoDeCobrosService } from './listado-de-cobros.service';

import { ListadoDeCobrosComponent } from './listado-de-cobros/listado-de-cobros.component';
import { TablaListadoComponent } from './components/tabla-listado/tabla-listado.component';
import { DatePipe } from '@angular/common';

const ROUTES: Routes = [
  { path: '', component: ListadoDeCobrosComponent  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    PipesModule
  ],
  declarations: [
    ListadoDeCobrosComponent,
    TablaListadoComponent
  ],
  providers: [
    ListadoDeCobrosService,
    FormatContractAccountPipe,
    DatePipe,
    FormatCurrencyEuroPipe
  ]
})
export class ListadoDeCobrosModule { }

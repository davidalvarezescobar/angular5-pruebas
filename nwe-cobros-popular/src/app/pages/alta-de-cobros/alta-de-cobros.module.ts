import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../components/shared.module';
import { DatosReciboComponent } from './datos-recibo/datos-recibo.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { DatosEmisionComponent } from './components/datos-emision/datos-emision.component';
import { DeudoresComponent } from './components/deudores/deudores.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListadoDeudoresComponent } from './components/listado-deudores/listado-deudores.component';
import { AltaDeCobrosService } from './alta-de-cobros.service';
import { BuscadorContratosComponent } from './components/buscador-contratos/buscador-contratos.component';
import { CancelarOperacionComponent } from './cancelar-operacion/cancelar-operacion.component';
import { FormatContractAccountPipe } from './../../pipes/format-contract-account/format-contract-account.pipe';
import { CalendarModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/dropdown';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(es);

const ROUTES: Routes = [
  { path: '', component: DatosReciboComponent  },
  { path: 'datos-recibo', component: DatosReciboComponent  },
  { path: 'confirmacion', component: ConfirmacionComponent  },
  { path: 'alta-deudor', component: DeudoresComponent},
  { path: 'buscador-contratos', component: BuscadorContratosComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    SharedModule
  ],
  declarations: [
    DatosReciboComponent,
    ConfirmacionComponent,
    DatosEmisionComponent,
    DeudoresComponent,
    ListadoDeudoresComponent,
    BuscadorContratosComponent,
    CancelarOperacionComponent
  ],
  providers: [
    AltaDeCobrosService,
    FormatContractAccountPipe,
    {provide: LOCALE_ID, useValue: 'es' }
  ],
  exports: [RouterModule]
})
export class AltaDeCobrosModule { }

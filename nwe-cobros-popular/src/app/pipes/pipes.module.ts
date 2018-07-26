import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormatContractAccountPipe } from './format-contract-account/format-contract-account.pipe';
import { FormatAccountIbanPipe } from './format-account-iban/format-account-iban.pipe';
import { FormatCurrencyEuroPipe } from './format-currency-euro/format-currency-euro.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormatContractAccountPipe,
    FormatAccountIbanPipe,
    FormatCurrencyEuroPipe
  ],
  exports: [
    FormatContractAccountPipe,
    FormatAccountIbanPipe,
    FormatCurrencyEuroPipe
  ]
})
export class PipesModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from 'ng2-translate';
import { DropdownModule } from 'primeng/primeng';

import { NweInitComponent } from './nwe-init/nwe-init.component';
import { CustomLanguageLoader } from '../../services/translations/language.loader';

export const ROUTES: Routes = [
  { path: '', component: NweInitComponent  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TranslateModule,
    DropdownModule,
    FormsModule
  ],
  declarations: [NweInitComponent], providers:[CustomLanguageLoader]
})
export class NweInitModule { }

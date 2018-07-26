import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';

export const routes: Routes = [
  { path: '', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PageNotFoundComponent
  ],
  providers: []
})
export class PageNotFoundModule { }

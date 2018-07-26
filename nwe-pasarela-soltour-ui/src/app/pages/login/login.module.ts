import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

const ROUTES: Routes = [
  { path: '', component: LoginComponent  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }

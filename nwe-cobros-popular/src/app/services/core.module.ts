import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Services
import { ApiService } from './api/api.service';
import { StorageService } from './storage/storage.service';
import { UserService } from './user/user.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    ApiService,
    StorageService,
    UserService
  ]
})
export class CoreModule { }
/*
*
* Module for only General Services or Singleton Globals
* Implements in app.module.ts
*
*/

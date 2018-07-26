import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Services
import { StorageService } from './storage/storage.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  providers: [
    StorageService
  ]
})
export class CoreServiceModule { }
/*
*
* Module for only General Services or Singleton Globals
* Implements in app.module.ts
*
*/

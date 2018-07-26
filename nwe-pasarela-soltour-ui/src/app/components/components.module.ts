import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FirmaComponent } from './firma/firma.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    HeaderComponent,
    FirmaComponent
  ],
  exports: [
    HeaderComponent,
    FirmaComponent
  ]
})
export class ComponentsModule { }

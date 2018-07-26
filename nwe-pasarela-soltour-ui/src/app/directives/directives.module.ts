import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlineBorderDirective } from './outline-border.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OutlineBorderDirective],
  exports: [OutlineBorderDirective]
})
export class DirectivesModule { }

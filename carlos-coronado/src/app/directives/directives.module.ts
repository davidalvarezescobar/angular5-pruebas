import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErroresDirective } from './control-errores.directive';
import { OutlineBorderDirective } from './outline-border.directive';
import { TooltipDirective } from './tooltip.directive';
import { ScrollableDirective } from './scrollable.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ControlErroresDirective,
    OutlineBorderDirective,
    TooltipDirective,
    ScrollableDirective
  ],
  exports: [
    ControlErroresDirective,
    OutlineBorderDirective,
    TooltipDirective,
    ScrollableDirective
  ]
})
export class DirectivesModule {
  // static forRoot(): ModuleWithProviders {
  //   return {
  //     ngModule: DirectivesModule,
  //     providers: [aquí pondríamos los servicios a compartir]
  //   };
  // }
}

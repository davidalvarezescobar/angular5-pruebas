import { Directive, HostListener, ElementRef } from '@angular/core';
import { DecimalEspPipe } from './decimal-esp.pipe';

@Directive({
  selector: '[formatearImporte]',
  providers: [
    DecimalEspPipe
  ]
})
export class FormatearImporteDirective {

  constructor(
    private el: ElementRef,
    private decimalEspPipe: DecimalEspPipe
  ) { }

  @HostListener('focus') onFocus() {
    this.el.nativeElement.value = this.el.nativeElement.value.replace(/\./g,'');
  }

  @HostListener('blur') onblur() {
    this.el.nativeElement.value = this.decimalEspPipe.transform( this.el.nativeElement.value );
  }
}

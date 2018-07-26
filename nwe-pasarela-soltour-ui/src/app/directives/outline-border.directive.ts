import { Directive, HostListener, ElementRef, ViewContainerRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[outlineBorder]'
})
export class OutlineBorderDirective {

  constructor(
    private element: ElementRef,
    private container: ViewContainerRef,
    private renderer: Renderer2
  ) { }

  @HostListener('focusin') onFocus() {
    this.renderer.addClass(this.element.nativeElement.firstElementChild.lastElementChild, 'outline-border');
  }

  @HostListener('focusout') onblur() {
    this.renderer.removeClass(this.element.nativeElement.firstElementChild.lastElementChild, 'outline-border');
  }

}

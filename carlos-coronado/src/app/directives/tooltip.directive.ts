import { Directive, ElementRef, Renderer2, HostListener, Injector, ViewContainerRef, TemplateRef, ViewRef, ComponentRef, ComponentFactoryResolver, Input } from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip/tooltip.component';
import { debounce } from '../decorators/debounce.decorator';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  @Input('tooltip') msg;
  private visible = false;

  constructor(
    private element : ElementRef,
    // private templateRef : TemplateRef<any>,
    // private viewRef: ViewRef,
    // private componentRef: ComponentRef<any>,
    private container: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {}


  @HostListener('mouseenter') mouseenter() {
    if(!this.visible) {
      this.container.clear();
      const componentFactory = this.resolver.resolveComponentFactory(TooltipComponent);
      const componentRef = this.container.createComponent(componentFactory);
      componentRef.instance.msg = this.msg;
      this.visible = true;
      // console.log('monitor:', this.visible);
    }
  }

  @HostListener('mouseleave') mouseleave() {
    if(this.visible) {
      this.container.clear();
      this.visible = false;
      // console.log('monitor:', this.visible);
    }
  }
}

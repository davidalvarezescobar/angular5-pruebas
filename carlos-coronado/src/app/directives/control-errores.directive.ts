import { Directive, Input, HostBinding, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip/tooltip.component';

@Directive({
  selector: '[controlErrores]'
})
export class ControlErroresDirective {
  @Input('controlErrores') set formControlErrors(controlErrores) {
    console.log(controlErrores);
    this.validate(controlErrores);
  }

  @HostBinding('class.error') classError: boolean = false;


  constructor(
    private container: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {}

  validate(errors) {
    this.container.clear();
    for(let validatorType in errors) {
      if(errors.hasOwnProperty(validatorType)) {
        const componentFactory = this.resolver.resolveComponentFactory(TooltipComponent);
        const componentRef = this.container.createComponent(componentFactory);
        componentRef.instance.msg = this.validationMsg(validatorType, errors[validatorType]);
        componentRef.instance.errorCss = true;
        this.classError = true;
        return;
      }
    }
    this.classError = false;
  }

  validationMsg(validatorType, validatorInfo) {
    let errors = {
      required: 'Campo obligatorio',
      minlength: `Tamaño mínimo: ${validatorInfo.requiredLength} caracteres`,
      eventCode: 'Sólo números'
    };
    return errors[validatorType];
  }

}

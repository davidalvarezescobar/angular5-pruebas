import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mascaraImporte'
})
export class MascaraImportePipe implements PipeTransform {
  private latestValue = '';

  constructor() {}

  transform(value: any, args?: any): any {
    if(!value) return '';
    const separador = args.split(/\d/).join('');
    const arg = args.split(separador);
    const regExpString = new RegExp('^[\\d]{1,'+arg[0]+'}(\\'+separador+'[\\d]{0,'+arg[1]+'})?$');
    if ( !regExpString.test(value) ) {
      return this.latestValue;
    } 
    this.latestValue = value;
    return value;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrencyEuro'
})
export class FormatCurrencyEuroPipe implements PipeTransform {

  transform(currencyNumber): any {
    if (currencyNumber) {
      let decimalSeparator = '.';
      let groupSeparator = '.';
      let number = ('' + currencyNumber).split(decimalSeparator);
      number[0] = number[0].replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
      if (number[1]) {
        if (number[1].length > 2) {
          number[1] = number[1].substr(0, 2);
        }
        if (number[1].length === 1) {
          number[1] = number[1].substr(0, 1);
          number[1] = number[1] + '0';
        }
      }
      if (!number[1]) {
        number[1] = '00';
      }
      return number.join();
    } else {
      return '0,00';
    }
  }

}

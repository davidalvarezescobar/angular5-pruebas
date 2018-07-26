import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAccountIban'
})
export class FormatAccountIbanPipe implements PipeTransform {

  transform(acountNumber): any {
    // 0049 0001 53 103 1217249 ESTE SERÍA EL FORMATO PARA MOSTRAR SIN EL 53

    if (acountNumber) {
      let acount = acountNumber;
      acount = acount.substr(0, 14) + ' ' + acount.substr(14);
      acount = acount.substr(0, 12) + ' ' + acount.substr(12);
      acount = acount.substr(0, 8) + ' ' + acount.substr(8);
      acount = acount.substr(0, 4) + ' ' + acount.substr(4);
      return acount;
    } else {
      return;
    }
  }

}

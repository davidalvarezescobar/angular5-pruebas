import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatContractAccount'
})
export class FormatContractAccountPipe implements PipeTransform {

  transform(accountNumber): any {
    // 0049 0001 23 1035312172
    if (accountNumber) {
      let account = accountNumber;

      account = account.substr(0, 10) + account.substr(10);
      account = account.substr(0, 10) + ' ' + account.substr(10);
      account = account.substr(0, 8) + ' ' + account.substr(8);
      account = account.substr(0, 4) + ' ' + account.substr(4);

      return account;

    } else { return; }
  }

}

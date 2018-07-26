import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { PagesService } from './../pages.service';
import { ApiService } from './../../services/api/api.service';

@Injectable()
export class DetalleReciboService {

  constructor(
    private api: ApiService,
    private pagesService: PagesService
  ) { }

  getDataMock(eBank, filters={}): Observable<any> {
    const data = {
      concesion: 'ES03 0075 0218 4961 1006 2262',
      account: 'ES02 0075 0218 4106 0644 3886',
      amount: '+340.000,00 Euros',
      reference: ' R21_TIPOC',
      dateOperation: '18-04-2018',
      dateDebt: '24-04-2018',
      deudores: [
        { dateEmision: '10-02-2012', reference: '', concept: 'DSD', amount: '+22,00 EUR', status: 'Rechazada'},
        { dateEmision: '02-04-2012', reference: '', concept: 'CURSOS FILOSOFÍA ORIENTAL', amount: '+191.001,45 EUR', status: 'Pendiente'},
        { dateEmision: '02-04-2012', reference: '', concept: 'CURSOS DE COMPRAS', amount: '+1.692.793,29 EUR', status: 'Rechazada'},
        { dateEmision: '02-04-2012', reference: '', concept: 'CURSOS FILOSOFÍA ORIENTAL', amount: '+191.001,45 EUR', status: 'Anulada'}
      ]
    };
    return of(data);
  }

  getData() {
    return of(this.pagesService.getDetail());
  }
}

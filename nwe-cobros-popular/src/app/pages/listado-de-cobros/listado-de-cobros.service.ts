import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Environment } from './../../config/setup/config';
import { FormatContractAccountPipe } from './../../pipes/format-contract-account/format-contract-account.pipe';
import { FormatCurrencyEuroPipe } from './../../pipes/format-currency-euro/format-currency-euro.pipe';
import { ApiService } from './../../services/api/api.service';

import { IRecibo } from './../data-model';
import { DatePipe } from '@angular/common';

@Injectable()
export class ListadoDeCobrosService {



  constructor(
    private api: ApiService,
    private formatContractAccountPipe: FormatContractAccountPipe,
    private formatCurrencyEuroPipe: FormatCurrencyEuroPipe,
    private formatDate: DatePipe
  ) { }

  getDataMock(filters = {}): Observable<any> {
    const configTable = {
      data: [
        {fechaEmision: '10-02-2012', referencia: '2www', concepto: 'DSD', importeTotal: '+22,00 EUR'},
        {fechaEmision: '02-04-2012', referencia: 'R22 TIPOA', concepto: 'CURSOS FILOSOFÍA ORIENTAL', importeTotal: '+191.001,45 EUR'},
        {fechaEmision: '02-04-2012', referencia: 'R22 TIPOC', concepto: 'CURSOS DE COMPRAS', importeTotal: '+1.692.793,29 EUR'},
        {fechaEmision: '02-04-2012', referencia: 'R22 TIPOA', concepto: 'CURSOS FILOSOFÍA ORIENTAL', importeTotal: '+191.001,45 EUR'},
        {fechaEmision: '02-04-2012', referencia: 'R22 TIPOC', concepto: 'CURSOS DE COMPRAS', importeTotal: '+1.692.793,29 EUR'},
        {fechaEmision: '02-04-2012', referencia: 'R22 TIPOB', concepto: 'MASTER EN INGLÉS', importeTotal: '+535.082,72 EUR'},
        {
          contrato: '',
          cuentaVinculada: '',
          concepto: 'MASTER EN INGLÉS',
          referencia: 'R22 TIPOB',
          fechaEmision: '02-02-2012',
          periodica: {
            periodicidad: '',
            fechaDesde: '',
            duracion: '',
            fechaHasta: ''
          },
          deudores: [
            { nombre: 'deudor1', referencia: '', concepto: '', contrato_iban: '', codigoDevolucion: '', importe: ''},
            { nombre: 'deudor2', referencia: '', concepto: '', contrato_iban: '', codigoDevolucion: '', importe: ''}
          ],
          importeTotal: '+535.082,72 EUR'
        }
      ]
    };
    return of(configTable);
  }

  getData() {
    return this.api.get(Environment.config.cobrosEndpoint.emissionList)
    .map(data => data);
  }

  getDetail(): Observable<IRecibo> {
    const eBank = '/1';
    return this.api.get(Environment.config.cobrosEndpoint.emissionDetail + eBank)
    .map(data => {
      const detailData = {
        contrato: '',
        cuentaVinculada: '',
        deudores: [],
        periodica: {
          periodicidad: '',
          fechaDesde: '',
          duracion: '',
          fechaHasta: ''
        },
        concepto: '',
        referencia: data.referenceOfEmission ? data.referenceOfEmission : '',
        fechaEmision: data.debitDate ? this.formatDate.transform(new Date(data.debitDate), 'dd-MM-yyyy') : '',
        fechaOperacion: data.operationDate ? this.formatDate.transform(new Date(data.operationDate), 'dd-MM-yyyy') : '',
        importeTotal: data.totalAmount ? this.formatCurrencyEuroPipe.transform(data.totalAmount) : '',
        moneda: 'EUR'
      }

      if(data.contracOfAssignment.id) {
        detailData.contrato = this.formatContractAccountPipe.transform(data.contracOfAssignment.id);
        console.log('contrato',detailData.contrato);
      }

      if(data.subscriptionAccount.id) {
        detailData.cuentaVinculada = this.formatContractAccountPipe.transform(data.subscriptionAccount.id);
        console.log('cuentaVinculada', detailData.cuentaVinculada)
      }

      if(data.emissionList) {
          data.emissionList.map(value => {
              detailData.deudores.push({
                  fechaEmision: value.emissionDate ? this.formatDate.transform(new Date(value.emissionDate), 'dd-MM-yyyy') : '',
                  nombre: value.debtor ? value.debtor : '',
                  referencia: value.reference ? value.reference : '',
                  concepto: value.concept ? value.concept : '',
                  contrato_iban: '', // Pendiente de recibir
                  codigoDevolucion: '', // Pendiente de recibir
                  importe: value.amount ? this.formatCurrencyEuroPipe.transform(value.amount) : '',
                  moneda: value.currency,
                  eBank: value.ebankCode ? value.ebankCode : '',
                  estado: value.status ? value.status : ''
              });
          });
      }

      return detailData;

    });
  }

  getDetailToSign() {
    const eBank = '/1';
    return this.api.get(Environment.config.cobrosEndpoint.emissionDetail + eBank)
    .map(data => {
      return {
        check: 0,
        description: '',
        amount: '',
        currency: '',
        amountCurrency: '',
        owner: '',
        cif: '',
        ownerCif: '',
        account: '',
        ibanCode: '',
        creationDate: '',
        expiredDate: '',
        signStatus: '',
        codeSignStatus: '',
        orderStatus: '',
        orderStatusCode: '',
        electronicBankCode: '1',
        operationType: '',
        action: 'F',

      };
    });
  }

}

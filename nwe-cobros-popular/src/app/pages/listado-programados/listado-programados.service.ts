import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Environment } from './../../config/setup/config';
import { ApiService } from './../../services/api/api.service';
import { PagesService } from './../pages.service';
import { FormatContractAccountPipe } from './../../pipes/format-contract-account/format-contract-account.pipe';
import { FormatCurrencyEuroPipe } from './../../pipes/format-currency-euro/format-currency-euro.pipe';

import { IRecibo } from './../data-model';
import { DatePipe } from '@angular/common';

@Injectable()
export class ListadoProgramadosService {

  fromRoute;

  constructor(
    private api: ApiService,
    private pagesSevice: PagesService,
    private formatContractAccountPipe: FormatContractAccountPipe,
    private formatCurrencyEuroPipe: FormatCurrencyEuroPipe,
    private formatDate: DatePipe
  ) {
    this.fromRoute = this.pagesSevice.getRouterHistory();
    console.log('fromRoute', this.fromRoute);
  }

  getData(params) {
    return this.api.get(Environment.config.cobrosEndpoint.programatedList)
      .map(data => {
        this.configDropdown(data);
        return data;
      });
  }

  // Params => filtros
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
          moneda: ' EUR'
        };

        if (data.contracOfAssignment.id) {
          detailData.contrato = this.formatContractAccountPipe.transform(data.contracOfAssignment.id);
          console.log('contrato', detailData.contrato);
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
        // contracOfAssignment: data.contracOfAssignment ? data.contracOfAssignment :'',
        // subscriptionAccount: data.subscriptionAccount ? data.subscriptionAccount : '',

        return detailData;

      });
  }

  private configDropdown(data) {
    data.programedCharges.map(value => {
      if ( this.fromRoute === '/alta-de-cobros') {
        value.options = [
            {name: 'Reutilizar', value: 'reutilizar', disabled: false},
            {name: 'Ver emisión', value: 'emision', disabled: false}
        ];
      } else if (value.status === 'Inactivo' && this.fromRoute !== '/alta-de-cobros') {
        value.options = [
            {name: 'Modificar', value: 'modificar', disabled: false},
            {name: 'Eliminar', value: 'eliminar', disabled: true},
            {name: 'Reutilizar', value: 'reutilizar', disabled: false},
            {name: 'Ver emisión', value: 'emision', disabled: false}
        ];
      } else {
        value.options = [
            {name: 'Modificar', value: 'modificar', disabled: false},
            {name: 'Eliminar', value: 'eliminar', disabled: false},
            {name: 'Reutilizar', value: 'reutilizar', disabled: false},
            {name: 'Ver emisión', value: 'emision', disabled: false}
        ];
      }
    });
    return data;
  }

}

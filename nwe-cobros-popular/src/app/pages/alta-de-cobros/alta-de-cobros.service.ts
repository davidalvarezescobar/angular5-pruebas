import { Injectable } from '@angular/core';
import { IRecibo, IDeudor } from '../data-model';
import { of } from 'rxjs/observable/of';
import { CONTRATOS } from '../mock-contratos';
import { ApiService } from '../../services/api/api.service';
import { Environment } from '../../config/setup/config';
import { FormatContractAccountPipe } from './../../pipes/format-contract-account/format-contract-account.pipe';
import { PagesService } from './../pages.service';


@Injectable()
export class AltaDeCobrosService {
  private recibo = null;
  private deudor = null;
  public selectedDeudorIndex = -1;
  private selectedContrato = null;

  constructor(
    private apiService: ApiService,
    private pagesService: PagesService,
    private formatContractAccount: FormatContractAccountPipe
  ) { }

  formatExternalRecibo(recibo: IRecibo) {
    const deudores =  recibo.deudores.map(deudor => { // eliminamos eBank, estado y fechaEmision
      const {eBank, estado, fechaEmision, ...restoDeudor} = deudor;
      return restoDeudor;
    });
    const { fechaOperacion, ...restoRecibo } = recibo; // eliminamos fechaOperacion
    restoRecibo.tipFechaEmision = recibo.periodica.periodicidad ? 'P' : 'U';
    return {...restoRecibo, deudores};
  }

  getRecibo() {
    const reciboEmitido = this.pagesService.getDetail();
    if (reciboEmitido) {
      this.recibo = this.formatExternalRecibo(reciboEmitido);
      this.pagesService.setDetail(null);
    }
    return this.recibo;
  }

  saveRecibo(recibo) {
    this.recibo = recibo;
  }

  getDeudor() {
    return this.deudor;
  }

  saveDeudor(deudor) {
    this.deudor = deudor;
  }

  removeDeudor() {
    this.deudor = null;
  }

  getContratos() {
    return this.apiService.get(Environment.config.cobrosEndpoint.accounts).map(contratos => {
      return contratos.listAccounts.map(contrato => {
        return {
          contrato: this.formatContractAccount.transform(contrato.chargeAccount.ccc),
          cuentaVinculada: this.formatContractAccount.transform(contrato.emmisionAccount.ccc),
          identificador: contrato.id,
          descripcion: contrato.description
        };
      });
    });
  }

  getContrato() {
    return this.selectedContrato;
  }

  saveContrato(contrato) {
    this.selectedContrato = contrato;
    this.pagesService.setHeaderProgramados(contrato);
  }

  removeContrato() {
    this.selectedContrato = null;
  }

  validarDeudor(deudor: IDeudor) {
    const backendDeudor = {
      debtorName : deudor.nombre,
      reference: deudor.referencia,
      concept: deudor.concepto,
      account: deudor.contrato_iban,
      refundCode: deudor.codigoDevolucion,
      amount: deudor.importe,
      currency: deudor.moneda
    };
    return this.apiService.put(Environment.config.cobrosEndpoint.validateDebtor, backendDeudor);
  }

  getDetailToSign() {
    const eBank = '/1';
    return this.apiService.get(Environment.config.cobrosEndpoint.emissionDetail + eBank)
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
        action: 'F'
      };
    });
  }

}

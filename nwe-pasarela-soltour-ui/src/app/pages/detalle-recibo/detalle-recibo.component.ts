import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InternalRoutes, indOperacion } from './../../services/constants';
import { PagesService } from './../pages.service';
import { IDetallePagoInfo } from './../interfaces';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'pst-detalle-recibo',
  templateUrl: './detalle-recibo.component.html',
  styleUrls: ['./detalle-recibo.component.less']
})
export class DetalleReciboComponent implements OnInit {

  headerData;
  detallePagoData: IDetallePagoInfo;
  showFirmar;
  returnOrdenes = false;
  indOperacion = indOperacion;
  tipOperacion = ''; // detalle

  constructor(private pagesService: PagesService, private router: Router) { }

  ngOnInit() {
    // this.detallePagoData = this.pagesService.getDetallePago();
    this.tipOperacion = this.pagesService.getOperacion();
    this.initDetalle();
  }

  initDetalle() {
    const detallePago: IDetallePagoInfo = {
      emailEmisor: 'soltour@gmail.com',
      emisor: 'Soltour',
      fechaFactura: '12/12/2018',
      importe: '12.345,00',
      moneda: 'EUR',
      numeroFactura: '111222',
      cuenta: 'ES2900490004110000000001',
      titular: 'Raul Romero Carvajal'
    };
    if (this.pagesService.getDetallePago()) {
      this.detallePagoData = this.pagesService.getDetallePago();
    } else {
      // borra la siguiente línea cuando se integre con FIRMAS PENDIENTES:
      this.detallePagoData = detallePago;
      // descomenta la siguiente línea cuando se integre con FIRMAS PENDIENTES:
      // this.router.navigateByUrl(InternalRoutes.buscadorContratos);
    }

    if (this.pagesService.getFirmarDetalle()) {
      this.headerData = 'Vas a firmar el pago de Soltour con los siguientes datos';
      if ( this.tipOperacion === indOperacion.anulacion ) {
        this.headerData = 'Vas a anular el pago de Soltour con los siguientes datos';
      }
      // Viene de ordenes pendientes
      this.returnOrdenes = this.pagesService.getFirmarDetalle();
      // Resetea que no venga de detalle otra vez
      this.pagesService.setFirmarDetalle(false);
    } else {
      this.headerData = 'Vas a emitir un pago con los siguientes datos';
    }

    this.showFirmar = false;
  }

  initFirmar() {
    this.headerData = 'Vas a firmar el pago de Soltour con los siguientes datos';
    this.showFirmar = true;
  }

  firmarAhora() {
    this.initFirmar();

  }

  firmarLuego() {
    this.pagesService.setResultadoFirma({
      headerTitle: 'Resultado de la firma de un pago de Soltour',
      resultadoFirma: 'La operación se ha enviado correctamente a firmas pendientes.',
      btnOperaciones: true
    });
    this.router.navigateByUrl(InternalRoutes.resultadoFirma);
  }

  cancelar() {
    this.pagesService.setSelectedCuenta(null);
    if(this.returnOrdenes) {
      this.router.navigateByUrl(InternalRoutes.ordenesPendientesFirma);
    } else {
      this.router.navigateByUrl(InternalRoutes.buscadorContratos);
    }
  }

  // Se activa al firmar desde el compnente de firma
  firmar(signatureKey) {
    let resultadoFirma = {
      headerTitle: 'Resultado de la firma de un pago de Soltour',
      resultadoFirma: 'La firma se ha realizado con éxito.',
      btnOperaciones: false
    };
    if ( this.tipOperacion === indOperacion.anulacion ) {
      resultadoFirma = {
        headerTitle: 'Resultado de la anulación de un pago de Soltour',
        resultadoFirma: 'La anulación se ha realizado con éxito.',
        btnOperaciones: false
      };
    }
    this.pagesService.setResultadoFirma(resultadoFirma);
    this.router.navigateByUrl(InternalRoutes.resultadoFirma);
    console.log('detalle-recibo.component:: Firmar()', signatureKey);
  }

}

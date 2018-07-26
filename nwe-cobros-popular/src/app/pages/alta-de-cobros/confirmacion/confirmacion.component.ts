import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AltaDeCobrosService } from '../alta-de-cobros.service';
import { IRecibo } from '../../data-model';
import { Location } from '@angular/common';

@Component({
  selector: 'nwe-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.less']
})
export class ConfirmacionComponent implements OnInit {
  @ViewChild('myModal') modal: ElementRef;
  recibo: IRecibo;
  today = Date.now();
  datosHeader = {
    title: 'Emitir recibos - Resumen y firma'
  };

  constructor(
    private location: Location,
    private altaService: AltaDeCobrosService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.recibo = this.altaService.getRecibo();
    console.log(this.recibo);
  }

  openModal() {
    this.modal.nativeElement.style.display = 'block';
    this.renderer.addClass(document.body, 'body-no-scroll');
  }

  closeModal() {
    this.modal.nativeElement.style.display = 'none';
    this.renderer.removeClass(document.body, 'body-no-scroll');
  }

  guardarOperacion() {
    // FALTA GUARDAR OPERACIÓN
    this.closeModal();
    this.location.back();
  }

  cancelarOperacion() {
    this.closeModal();
    this.location.back();
  }

  firmar() {
    this.altaService.getDetailToSign().subscribe(data => {
      sessionStorage.setItem('pending-sign-orders-data', JSON.stringify(data));
      // Redirección a pending sign
      // Añadir la url a través del config
      window.location.href = 'https://nwe-obe-ui-san-nweb-emp-dev.appls.boaw.paas.gsnetcloud.corp/#/cobros/firmar';
    });
  }

}

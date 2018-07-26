import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PagesService } from '../../pages.service';
import { InternalRoutes, indOperacion } from '../../../services/constants';

import { PagesService } from './../../pages.service';
import { InternalRoutes } from './../../../services/constants';

@Component({
  selector: 'pst-ordenes-pendientes-firma',
  templateUrl: './ordenes-pendientes-firma.component.html',
  styleUrls: ['./ordenes-pendientes-firma.component.less']
})
export class OrdenesPendientesFirmaComponent implements OnInit {
  @ViewChild('myModal') modal: ElementRef;
  selected = false;
  indOperacion = indOperacion;

  constructor(
    private location: Location,
    private renderer: Renderer2,
    private router: Router,
    private pagesService: PagesService
  ) { }

  ngOnInit() {
  }

  volver() {
    this.router.navigateByUrl(InternalRoutes.operacionesPendientesFirma);
  }

  gotoDetalle(selectedOperacion) {
    this.pagesService.setOperacion(selectedOperacion);
    this.pagesService.setFirmarDetalle(true);
    this.router.navigateByUrl(InternalRoutes.detalleRecibo);
  }

  openModal() {
    this.modal.nativeElement.style.display = 'block';
    this.renderer.addClass(document.body, 'body-no-scroll');
  }

  closeModal() {
    this.modal.nativeElement.style.display = 'none';
    this.renderer.removeClass(document.body, 'body-no-scroll');
  }

}

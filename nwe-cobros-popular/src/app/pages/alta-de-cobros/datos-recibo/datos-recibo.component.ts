import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AltaDeCobrosService } from '../alta-de-cobros.service';
import { Router } from '@angular/router';
import { PagesService } from '../../pages.service';
import { IRecibo, IDeudor } from '../../data-model';

@Component({
  selector: 'nwe-datos-recibo',
  templateUrl: './datos-recibo.component.html',
  styleUrls: ['./datos-recibo.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatosReciboComponent implements OnInit {
  @ViewChild('myModal') modal: ElementRef;
  private _deudoresFormArray: FormArray;
  form: FormGroup = this.fb.group({
    contrato: '',
    cuentaVinculada: '',
    concepto: '',
    referencia: '',
    tipFechaEmision: 'U',
    fechaEmision: '',
    periodica: this.fb.group({
      periodicidad: '',
      fechaDesde: '',
      duracion: 'I',
      fechaHasta: ''
    }),
    deudores: this.fb.array([]),
    importeTotal: '',
    moneda: ''
  });
  selectedDeudorIndex = -1;
  datosHeader = {
    title: 'Emitir recibos - Insertar datos del recibo',
    // tslint:disable-next-line:max-line-length
    subtitle: 'Mediante esta operativa podrás emitir recibos a tus clientes. Completa los datos comunes del recibo y a continuación los de cada valor.'
  };

  private routes = {
    busquedaContrato: '/alta-de-cobros/buscador-contratos',
    busquedaRecibo: '/listado-programados',
    altaRecibo: '/alta-de-cobros/alta-deudor',
    confirmacion: 'alta-de-cobros/confirmacion'
  };

  constructor(
    private fb: FormBuilder,
    private altaService: AltaDeCobrosService,
    private pagesService: PagesService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.getRecibo();
  }

  getRecibo() {
    const recibo = this.altaService.getRecibo();
    if (recibo) {
      const deudoresFormGroup = recibo.deudores.map(deudores => this.fb.group(deudores));
      const deudoresFormArray = this.fb.array(deudoresFormGroup);
      this.form.setControl('deudores', deudoresFormArray);
      this.form.setValue(recibo);
    }

    this._deudoresFormArray = this.form.get('deudores') as FormArray;

    const deudor = this.altaService.getDeudor();
    if (deudor) {
      this.selectDeudor(deudor);
      this.altaService.removeDeudor();
    }

    const contrato = this.altaService.getContrato();
    if (contrato) {
      this.form.patchValue({
        contrato: contrato.contrato,
        cuentaVinculada: contrato.cuentaVinculada
      });
      this.altaService.removeContrato();
    }
  }

  buscarReciboEmitido() {
    this.altaService.saveRecibo(this.form.value);
    this.navigate(this.routes.busquedaRecibo);
  }

  buscarContrato() {
    this.altaService.saveRecibo(this.form.value);
    this.pagesService.setRouteHistory();
    this.navigate(this.routes.busquedaContrato);
  }

  selectDeudor(deudor) {
    const index = this.altaService.selectedDeudorIndex;
    if (index >= 0) {
      this._deudoresFormArray.at(index).patchValue(deudor);
      this.altaService.selectedDeudorIndex = -1;
    } else {
      this._deudoresFormArray.push( this.fb.group(deudor) );
    }
  }

  get deudores() {
    return this._deudoresFormArray.value;
  }

  addDeudor() {
    this.altaService.saveRecibo(this.form.value);
    this.navigate(this.routes.altaRecibo);
  }

  editDeudor(index) {
    this.altaService.saveRecibo(this.form.value);
    this.altaService.saveDeudor(this._deudoresFormArray.at(index).value);
    this.altaService.selectedDeudorIndex = index;
    this.navigate(this.routes.altaRecibo);
  }

  removeDeudor(index) {
    this._deudoresFormArray.removeAt(index);
  }

  navigate(to) {
    this.router.navigateByUrl(to);
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
  }

  cancelarOperacion() {
    this.resetForm();
    this.closeModal();
  }

  resetForm() {
    const tamDeudoresArray = this._deudoresFormArray.length;
      for (let index = tamDeudoresArray - 1; index >= 0; index-- ) {
        this._deudoresFormArray.removeAt(index);
      }
    this.form.reset();
  }

  onSubmit() {
    const datosRecibo = this.form.value;
    this.altaService.saveRecibo(datosRecibo);
    this.navigate(this.routes.confirmacion);
  }

  getTotal(total) {
    this.form.patchValue({
      importeTotal: total
    });
  }
}

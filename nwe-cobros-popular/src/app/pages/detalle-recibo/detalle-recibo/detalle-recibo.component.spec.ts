import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleReciboComponent } from './detalle-recibo.component';

describe('DetalleReciboComponent', () => {
  let component: DetalleReciboComponent;
  let fixture: ComponentFixture<DetalleReciboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleReciboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

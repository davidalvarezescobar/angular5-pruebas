import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosListadoProgramadosComponent } from './filtros-listado-programados.component';

describe('FiltrosListadoProgramadosComponent', () => {
  let component: FiltrosListadoProgramadosComponent;
  let fixture: ComponentFixture<FiltrosListadoProgramadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrosListadoProgramadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosListadoProgramadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

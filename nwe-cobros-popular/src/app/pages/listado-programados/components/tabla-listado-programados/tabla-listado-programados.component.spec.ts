import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadoProgramadosComponent } from './tabla-listado-programados.component';

describe('TablaListadoProgramadosComponent', () => {
  let component: TablaListadoProgramadosComponent;
  let fixture: ComponentFixture<TablaListadoProgramadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadoProgramadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadoProgramadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

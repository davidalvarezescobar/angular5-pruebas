import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaListadoComponent } from './tabla-listado.component';

describe('TablaListadoComponent', () => {
  let component: TablaListadoComponent;
  let fixture: ComponentFixture<TablaListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

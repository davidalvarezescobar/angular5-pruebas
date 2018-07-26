import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProgramadosComponent } from './listado-programados.component';

describe('ListadoProgramadosComponent', () => {
  let component: ListadoProgramadosComponent;
  let fixture: ComponentFixture<ListadoProgramadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoProgramadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoProgramadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

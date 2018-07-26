import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDeCobrosComponent } from './listado-de-cobros.component';

describe('ListadoDeCobrosComponent', () => {
  let component: ListadoDeCobrosComponent;
  let fixture: ComponentFixture<ListadoDeCobrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoDeCobrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoDeCobrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

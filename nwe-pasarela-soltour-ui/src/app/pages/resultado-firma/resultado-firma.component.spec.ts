import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoFirmaComponent } from './resultado-firma.component';

describe('ResultadoFirmaComponent', () => {
  let component: ResultadoFirmaComponent;
  let fixture: ComponentFixture<ResultadoFirmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoFirmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoFirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacionFirmaComponent } from './situacion-firma.component';

describe('SituacionFirmaComponent', () => {
  let component: SituacionFirmaComponent;
  let fixture: ComponentFixture<SituacionFirmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituacionFirmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituacionFirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

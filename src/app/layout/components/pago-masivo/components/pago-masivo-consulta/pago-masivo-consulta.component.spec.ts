import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoMasivoConsultaComponent } from './pago-masivo-consulta.component';

describe('PagoMasivoConsultaComponent', () => {
  let component: PagoMasivoConsultaComponent;
  let fixture: ComponentFixture<PagoMasivoConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoMasivoConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoMasivoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

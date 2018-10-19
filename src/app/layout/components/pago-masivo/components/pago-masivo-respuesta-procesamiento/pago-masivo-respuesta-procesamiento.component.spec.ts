import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoMasivoRespuestaProcesamientoComponent } from './pago-masivo-respuesta-procesamiento.component';

describe('PagoMasivoRespuestaProcesamientoComponent', () => {
  let component: PagoMasivoRespuestaProcesamientoComponent;
  let fixture: ComponentFixture<PagoMasivoRespuestaProcesamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoMasivoRespuestaProcesamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoMasivoRespuestaProcesamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

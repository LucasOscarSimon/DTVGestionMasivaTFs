import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoMasivoEmergenteRespuestaComponent } from './pago-masivo-emergente-respuesta.component';

describe('PagoMasivoEmergenteRespuestaComponent', () => {
  let component: PagoMasivoEmergenteRespuestaComponent;
  let fixture: ComponentFixture<PagoMasivoEmergenteRespuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoMasivoEmergenteRespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoMasivoEmergenteRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

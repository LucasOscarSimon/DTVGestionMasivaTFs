import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoMasivoResumenImportacionComponent } from './pago-masivo-resumen-importacion.component';

describe('PagoMasivoResumenImportacionComponent', () => {
  let component: PagoMasivoResumenImportacionComponent;
  let fixture: ComponentFixture<PagoMasivoResumenImportacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoMasivoResumenImportacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoMasivoResumenImportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

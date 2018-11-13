import { TestBed } from '@angular/core/testing';

import { PagoMasivoService } from './pago-masivo.service';

describe('PagoMasivoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagoMasivoService = TestBed.get(PagoMasivoService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TransaccionesFinancierasService } from './transacciones-financieras.service';

describe('TransaccionesFinancierasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransaccionesFinancierasService = TestBed.get(TransaccionesFinancierasService);
    expect(service).toBeTruthy();
  });
});

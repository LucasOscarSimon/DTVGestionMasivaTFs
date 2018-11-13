import { TestBed } from '@angular/core/testing';

import { AjusteMasivoService } from './ajuste-masivo.service';

describe('AjusteMasivoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AjusteMasivoService = TestBed.get(AjusteMasivoService);
    expect(service).toBeTruthy();
  });
});

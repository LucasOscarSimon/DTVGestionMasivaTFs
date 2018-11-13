import { TestBed } from '@angular/core/testing';

import { BorradoMasivoService } from './borrado-masivo.service';

describe('BorradoMasivoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BorradoMasivoService = TestBed.get(BorradoMasivoService);
    expect(service).toBeTruthy();
  });
});

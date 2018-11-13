import { TestBed } from '@angular/core/testing';

import { ConsultaAuditoriaService } from './consulta-auditoria.service';

describe('ConsultaAuditoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaAuditoriaService = TestBed.get(ConsultaAuditoriaService);
    expect(service).toBeTruthy();
  });
});

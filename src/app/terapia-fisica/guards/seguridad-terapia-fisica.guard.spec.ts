import { TestBed } from '@angular/core/testing';

import { SeguridadTerapiaFisicaGuard } from './seguridad-terapia-fisica.guard';

describe('SeguridadTerapiaFisicaGuard', () => {
  let guard: SeguridadTerapiaFisicaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SeguridadTerapiaFisicaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

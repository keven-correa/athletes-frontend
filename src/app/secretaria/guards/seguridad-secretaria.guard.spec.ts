import { TestBed } from '@angular/core/testing';

import { SeguridadSecretariaGuard } from './seguridad-secretaria.guard';

describe('SeguridadSecretariaGuard', () => {
  let guard: SeguridadSecretariaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SeguridadSecretariaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

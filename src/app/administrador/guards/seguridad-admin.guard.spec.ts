import { TestBed } from '@angular/core/testing';

import { SeguridadAdminGuard } from './seguridad-admin.guard';

describe('SeguridadAdminGuard', () => {
  let guard: SeguridadAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SeguridadAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

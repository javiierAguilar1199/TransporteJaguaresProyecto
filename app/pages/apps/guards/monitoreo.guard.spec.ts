import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { monitoreoGuard } from './monitoreo.guard';

describe('AdminGuard', () => {
  let guard: monitoreoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(monitoreoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

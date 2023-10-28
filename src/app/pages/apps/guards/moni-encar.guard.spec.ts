import { TestBed } from '@angular/core/testing';
import { moniencar } from './moni-encar.guard';

describe('moniencarGuard', () => {
  let guard: moniencar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(moniencar);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

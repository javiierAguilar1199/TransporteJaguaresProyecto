import { TestBed } from '@angular/core/testing';
import { encargadoGuard } from './encargado.guard';

describe('encargadoGuard', () => {
  let guard: encargadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(encargadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

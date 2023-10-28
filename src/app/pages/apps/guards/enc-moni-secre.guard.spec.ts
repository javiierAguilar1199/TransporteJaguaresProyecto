import { TestBed } from '@angular/core/testing';
import { encMoniSecreGuard } from './enc-moni-secre.guard';

describe('EnCaMOniguard', () => {
  let guard: encMoniSecreGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(encMoniSecreGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

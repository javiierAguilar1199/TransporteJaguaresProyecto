import { TestBed } from '@angular/core/testing';

import { AdminViajesService } from './admin-viajes.service';

describe('AdminViajesService', () => {
  let service: AdminViajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminViajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

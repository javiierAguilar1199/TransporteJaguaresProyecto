import { TestBed } from '@angular/core/testing';

import { AdminSociosServiceService } from './admin-socios-service.service';

describe('AdminSociosServiceService', () => {
  let service: AdminSociosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSociosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

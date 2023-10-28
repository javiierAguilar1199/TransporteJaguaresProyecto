import { TestBed } from '@angular/core/testing';

import { AdminHorariosService } from './admin-horarios.service';

describe('AdminHorariosService', () => {
  let service: AdminHorariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminHorariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

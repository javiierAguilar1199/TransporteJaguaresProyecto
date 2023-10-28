import { TestBed } from '@angular/core/testing';

import { AdminUnidadesService } from './admin-unidades.service';

describe('AdminUnidadesService', () => {
  let service: AdminUnidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUnidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AdminiPilotosService } from './admini-pilotos.service';

describe('AdminiPilotosService', () => {
  let service: AdminiPilotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminiPilotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

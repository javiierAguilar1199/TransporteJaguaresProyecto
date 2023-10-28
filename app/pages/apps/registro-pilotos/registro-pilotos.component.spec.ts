import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPilotosComponent } from './registro-pilotos.component';

describe('RegistroPilotosComponent', () => {
  let component: RegistroPilotosComponent;
  let fixture: ComponentFixture<RegistroPilotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPilotosComponent]
    });
    fixture = TestBed.createComponent(RegistroPilotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

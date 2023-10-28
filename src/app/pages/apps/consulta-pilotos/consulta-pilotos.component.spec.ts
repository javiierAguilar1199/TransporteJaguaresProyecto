import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPilotosComponent } from './consulta-pilotos.component';

describe('ConsultaPilotosComponent', () => {
  let component: ConsultaPilotosComponent;
  let fixture: ComponentFixture<ConsultaPilotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaPilotosComponent]
    });
    fixture = TestBed.createComponent(ConsultaPilotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

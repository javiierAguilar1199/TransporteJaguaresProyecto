import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroHorariosComponent } from './registro-horarios.component';

describe('RegistroHorariosComponent', () => {
  let component: RegistroHorariosComponent;
  let fixture: ComponentFixture<RegistroHorariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroHorariosComponent]
    });
    fixture = TestBed.createComponent(RegistroHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

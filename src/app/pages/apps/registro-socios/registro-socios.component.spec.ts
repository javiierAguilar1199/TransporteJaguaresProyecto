import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSociosComponent } from './registro-socios.component';

describe('RegistroSociosComponent', () => {
  let component: RegistroSociosComponent;
  let fixture: ComponentFixture<RegistroSociosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroSociosComponent]
    });
    fixture = TestBed.createComponent(RegistroSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

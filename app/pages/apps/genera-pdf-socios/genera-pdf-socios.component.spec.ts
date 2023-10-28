import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraPdfSociosComponent } from './genera-pdf-socios.component';

describe('GeneraPdfSociosComponent', () => {
  let component: GeneraPdfSociosComponent;
  let fixture: ComponentFixture<GeneraPdfSociosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneraPdfSociosComponent]
    });
    fixture = TestBed.createComponent(GeneraPdfSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraPDFComponent } from './genera-pdf.component';

describe('GeneraPDFComponent', () => {
  let component: GeneraPDFComponent;
  let fixture: ComponentFixture<GeneraPDFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneraPDFComponent]
    });
    fixture = TestBed.createComponent(GeneraPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

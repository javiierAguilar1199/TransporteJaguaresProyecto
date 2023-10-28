import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfSocioComponent } from './pdf-socio.component';

describe('PdfSocioComponent', () => {
  let component: PdfSocioComponent;
  let fixture: ComponentFixture<PdfSocioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfSocioComponent]
    });
    fixture = TestBed.createComponent(PdfSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

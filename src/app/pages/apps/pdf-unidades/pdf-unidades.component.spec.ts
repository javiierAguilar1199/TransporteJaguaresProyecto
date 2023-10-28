import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfUnidadesComponent } from './pdf-unidades.component';

describe('PdfUnidadesComponent', () => {
  let component: PdfUnidadesComponent;
  let fixture: ComponentFixture<PdfUnidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfUnidadesComponent]
    });
    fixture = TestBed.createComponent(PdfUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

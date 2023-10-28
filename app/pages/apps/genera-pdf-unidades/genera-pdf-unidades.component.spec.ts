import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraPDfUnidadesComponent } from './genera-pdf-unidades.component';

describe('GeneraPDfUnidadesComponent', () => {
  let component: GeneraPDfUnidadesComponent;
  let fixture: ComponentFixture<GeneraPDfUnidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneraPDfUnidadesComponent]
    });
    fixture = TestBed.createComponent(GeneraPDfUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

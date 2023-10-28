import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarUnidadComponent } from './actualizar-unidad.component';

describe('ActualizarUnidadComponent', () => {
  let component: ActualizarUnidadComponent;
  let fixture: ComponentFixture<ActualizarUnidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarUnidadComponent]
    });
    fixture = TestBed.createComponent(ActualizarUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

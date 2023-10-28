import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarBitacoraComponent } from './actualizar-bitacora.component';

describe('ActualizarBitacoraComponent', () => {
  let component: ActualizarBitacoraComponent;
  let fixture: ComponentFixture<ActualizarBitacoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarBitacoraComponent]
    });
    fixture = TestBed.createComponent(ActualizarBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

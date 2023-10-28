import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarSocioComponent } from './actualizar-socio.component';

describe('ActualizarSocioComponent', () => {
  let component: ActualizarSocioComponent;
  let fixture: ComponentFixture<ActualizarSocioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarSocioComponent]
    });
    fixture = TestBed.createComponent(ActualizarSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

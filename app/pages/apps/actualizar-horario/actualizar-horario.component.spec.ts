import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarHorarioComponent } from './actualizar-horario.component';

describe('ActualizarHorarioComponent', () => {
  let component: ActualizarHorarioComponent;
  let fixture: ComponentFixture<ActualizarHorarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarHorarioComponent]
    });
    fixture = TestBed.createComponent(ActualizarHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

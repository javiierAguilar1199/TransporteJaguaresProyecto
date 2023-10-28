import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraViajeComponent } from './bitacora-viaje.component';

describe('BitacoraViajeComponent', () => {
  let component: BitacoraViajeComponent;
  let fixture: ComponentFixture<BitacoraViajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BitacoraViajeComponent]
    });
    fixture = TestBed.createComponent(BitacoraViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarUsrComponent } from './actualizar-usr.component';

describe('ActualizarUsrComponent', () => {
  let component: ActualizarUsrComponent;
  let fixture: ComponentFixture<ActualizarUsrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarUsrComponent]
    });
    fixture = TestBed.createComponent(ActualizarUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

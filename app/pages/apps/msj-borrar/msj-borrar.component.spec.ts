import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsjBorrarComponent } from './msj-borrar.component';

describe('MsjBorrarComponent', () => {
  let component: MsjBorrarComponent;
  let fixture: ComponentFixture<MsjBorrarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MsjBorrarComponent]
    });
    fixture = TestBed.createComponent(MsjBorrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

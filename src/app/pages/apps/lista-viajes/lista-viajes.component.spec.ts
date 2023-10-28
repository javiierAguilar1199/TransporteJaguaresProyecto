import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaViajesComponent } from './lista-viajes.component';

describe('ListaViajesComponent', () => {
  let component: ListaViajesComponent;
  let fixture: ComponentFixture<ListaViajesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaViajesComponent]
    });
    fixture = TestBed.createComponent(ListaViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

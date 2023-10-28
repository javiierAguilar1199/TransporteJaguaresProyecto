import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUnidadesComponent } from './lista-unidades.component';

describe('ListaUnidadesComponent', () => {
  let component: ListaUnidadesComponent;
  let fixture: ComponentFixture<ListaUnidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaUnidadesComponent]
    });
    fixture = TestBed.createComponent(ListaUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

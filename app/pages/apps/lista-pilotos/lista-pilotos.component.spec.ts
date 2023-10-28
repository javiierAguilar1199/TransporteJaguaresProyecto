import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPilotosComponent } from './lista-pilotos.component';

describe('ListaPilotosComponent', () => {
  let component: ListaPilotosComponent;
  let fixture: ComponentFixture<ListaPilotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPilotosComponent]
    });
    fixture = TestBed.createComponent(ListaPilotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

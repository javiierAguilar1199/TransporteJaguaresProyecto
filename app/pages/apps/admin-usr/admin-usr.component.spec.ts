import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsrComponent } from './admin-usr.component';

describe('AdminUsrComponent', () => {
  let component: AdminUsrComponent;
  let fixture: ComponentFixture<AdminUsrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUsrComponent]
    });
    fixture = TestBed.createComponent(AdminUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

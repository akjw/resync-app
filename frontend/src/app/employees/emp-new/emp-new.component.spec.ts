import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpNewComponent } from './emp-new.component';

describe('EmpNewComponent', () => {
  let component: EmpNewComponent;
  let fixture: ComponentFixture<EmpNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptNewComponent } from './dept-new.component';

describe('DeptNewComponent', () => {
  let component: DeptNewComponent;
  let fixture: ComponentFixture<DeptNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

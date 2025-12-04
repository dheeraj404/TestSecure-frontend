import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminerDetailsComponent } from './examiner-details.component';

describe('ExaminerDetailsComponent', () => {
  let component: ExaminerDetailsComponent;
  let fixture: ComponentFixture<ExaminerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExaminerDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExaminerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

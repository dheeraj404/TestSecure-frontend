import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExaminerComponent } from './create-examiner.component';

describe('CreateExaminerComponent', () => {
  let component: CreateExaminerComponent;
  let fixture: ComponentFixture<CreateExaminerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateExaminerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateExaminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExaminerComponent } from './list-examiner.component';

describe('ListExaminerComponent', () => {
  let component: ListExaminerComponent;
  let fixture: ComponentFixture<ListExaminerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListExaminerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListExaminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExpenseModalComponent } from './view-expense-modal.component';

describe('ViewExpenseModalComponent', () => {
  let component: ViewExpenseModalComponent;
  let fixture: ComponentFixture<ViewExpenseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExpenseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExpenseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

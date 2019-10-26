import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { ExpensesComponent } from './expenses.component';

describe('ExpensesComponent', () => {
  let component: ExpensesComponent;
  let fixture: ComponentFixture<ExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // tslint:disable-next-line: deprecation
      imports: [ScrollDispatchModule],
      declarations: [ ExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

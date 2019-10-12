import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Expense } from '../models/expense';
import { MatMenuTrigger, MatDialog, MatSnackBar } from '@angular/material';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  expenses: Expense[];
  selectedExpense: Expense;
  @ViewChild(MatMenuTrigger, {static: false})
  menu: MatMenuTrigger;

  constructor(
    private expensesService: ExpensesService,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.expensesService.getUserExpensess()
    .subscribe(
      expenses => {
        this.expenses = expenses;
        this.changeDetector.detectChanges();
      },
      error => {
        console.log(error);
      });
  }

  onTriggerMenu(expense: Expense) {
    this.selectedExpense = expense;
  }

  deleteExpense() {
  }

  editExpense() {
  }

}

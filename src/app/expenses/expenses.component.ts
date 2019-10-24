import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Expense } from '../models/expense';
import { MatMenuTrigger, MatDialog, MatSnackBar } from '@angular/material';
import { ExpensesService } from '../services/expenses.service';
import { AddExpenseModalComponent } from '../add-expense-modal/add-expense-modal.component';
import { ViewExpenseModalComponent } from '../view-expense-modal/view-expense-modal.component';

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

  viewExpense() {
    const dialogRef = this.dialog.open(ViewExpenseModalComponent, {
      width: '750px',
      data: {expense: this.selectedExpense}
    });
  }

  editExpense() {
    const dialogRef = this.dialog.open(AddExpenseModalComponent, {
      width: '750px',
      data: {expense: this.selectedExpense}
    });
  }

  deleteExpense() {
    this.expensesService.deleteExpenseByID(this.selectedExpense.id).subscribe(() => {
      this.snackBar.open('expense deleted successful', 'close', {duration: 3000});
      this.ngOnInit();
    },
    error => {
      this.snackBar.open(error.error.message, 'close', {duration: 3000});
    });
  }
  addExpense() {
    const dialogRef = this.dialog.open(AddExpenseModalComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

}

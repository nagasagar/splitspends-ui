import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Expense } from '../models/expense';

@Component({
  selector: 'app-view-expense-modal',
  templateUrl: './view-expense-modal.component.html',
  styleUrls: ['./view-expense-modal.component.css']
})
export class ViewExpenseModalComponent implements OnInit {

  expense: Expense;
  payeeColumns: string[] = ['payee', 'amount'];

  constructor(
    public dialogRef: MatDialogRef<ViewExpenseModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.expense = data.expense;
  }


  ngOnInit() {
  }


  close() {
    this.dialogRef.close(true);
  }
}

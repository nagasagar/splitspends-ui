import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { User } from '../models/user';
import { MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FriendsService, UserService, GroupsService, AuthenticationService } from '../services';
import { Group } from '../models/group';
import { Expense } from '../models/expense';
import { Payment } from '../models/payment';
import { Share } from '../models/share';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
  styleUrls: ['./add-expense-modal.component.css']
})
export class AddExpenseModalComponent implements OnInit {

  submitted = false;
  addExpenseForm: FormGroup;
  expense: Expense;
  friends: User[];
  groups: Group[];
  isGroupExpense = false;
  paymentsList: FormArray;
  sharesList: FormArray;
  eligibleContributers: User[];
  constructor(
    public dialogRef: MatDialogRef<AddExpenseModalComponent>,
    private friendsService: FriendsService,
    private groupsService: GroupsService,
    private userService: UserService,
    private authService: AuthenticationService,
    private expensesService: ExpensesService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.expense = data.expense;
    friendsService.getUserFriends().subscribe(friends => {
      this.friends = friends;
      authService.getUserProfile().subscribe(user => {
        this.friends.push(user);
      });
      this.eligibleContributers = this.friends;
    });
    groupsService.getUserGroups().subscribe(groups => this.groups = groups);
  }

  get f() { return this.addExpenseForm.controls; }

  // returns all form groups under contacts
  get paymentsFormGroup() {
    return this.addExpenseForm.get('payments') as FormArray;
  }

  // returns all form groups under contacts
  get shareFormGroup() {
    return this.addExpenseForm.get('shares') as FormArray;
  }

  ngOnInit() {
    this.addExpenseForm = this.formBuilder.group({
      detail: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')])],
      group: [null],
      payments: this.formBuilder.array([this.createPayment()]),
      shares: this.formBuilder.array([this.createShare()])
    });
    this.paymentsList = this.addExpenseForm.get('payments') as FormArray;
    this.sharesList = this.addExpenseForm.get('shares') as FormArray;
    if (this.expense) {
      this.addExpenseForm.patchValue({
        detail: this.expense.detail,
        amount: this.expense.amount,
        group: this.expense.group,
      });
      if (this.expense.group) {
        this.isGroupExpense = true;
      }
      this.paymentsList.removeAt(0);
      for (const payment of this.expense.payments) {
        this.paymentsList.push(this.patchPayment(payment));
      }
      this.sharesList.removeAt(0);
      for (const share of this.expense.shares) {
        this.sharesList.push(this.patchShare(share));
      }
    }

  }

  onChange() {
    const groupFormControl = this.addExpenseForm.get('group');
    if (this.isGroupExpense) {
      this.eligibleContributers = [];
      groupFormControl.setValidators(Validators.required);
    } else {
      this.eligibleContributers = this.friends;
      groupFormControl.setValue(null);
      groupFormControl.clearValidators();
    }
    groupFormControl.updateValueAndValidity();
  }

  onGroupSelection() {
    if (this.addExpenseForm.value.group) {
      this.groupsService.getGroupByID(this.addExpenseForm.value.group.id).subscribe(group => {
        this.eligibleContributers = group.members;
      });
    }
  }

  // payments formgroup
  createPayment(): FormGroup {
    return this.formBuilder.group({
      payee: ['', Validators.compose([Validators.required])],
      amount: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')])]
    });
  }

  patchPayment(payment: Payment): FormGroup {
    const paymentRow = this.formBuilder.group({
      payee: ['', Validators.compose([Validators.required])],
      amount: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')])]
    });
    paymentRow.patchValue({
      payee: payment.payee,
      amount: payment.amount
    });
    return paymentRow;
  }

  // shares formgroup
  createShare(): FormGroup {
    return this.formBuilder.group({
      spender: ['', Validators.compose([Validators.required])],
      amount: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')])]
    });
  }

  patchShare(share: Share): FormGroup {
    const shareRow = this.formBuilder.group({
      spender: ['', Validators.compose([Validators.required])],
      amount: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')])]
    });
    shareRow.patchValue({
      spender: share.spender,
      amount: share.amount
    });
    return shareRow;
  }

  addPaymentRow() {
    this.paymentsList.push(this.createPayment());
  }

  removePaymentRow(index) {
    this.paymentsList.removeAt(index);
  }

  addShareRow() {
    this.sharesList.push(this.createShare());
  }

  removeShareRow(index) {
    this.sharesList.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addExpenseForm.invalid) {
      return;
    }
    if (!this.isBillTotalvalid(this.addExpenseForm.value)) {
      return;
    }

    this.expensesService.addExpense(this.addExpenseForm.value).subscribe(
      () => {
        this.snackBar.open('adding expense successful', 'close', { duration: 3000 });
        this.dialogRef.close();
      },
      error => {
        this.snackBar.open(error.error.message, 'close');
      });

  }

  isBillTotalvalid(e: Expense): boolean {
    const total = Number(e.amount);
    const paymentsTotal = e.payments.reduce((prev, cur) => {
      return prev + Number(cur.amount);
    }, 0);
    const sharesTotal = e.shares.reduce((prev, cur) => {
      return prev + Number(cur.amount);
    }, 0);
    if (total === paymentsTotal && total === sharesTotal) {
      return true;
    }
    this.snackBar.open('invalid expense : total=' + total + ', paymentsTotal=' +
      paymentsTotal + ', sharesTotal=' + sharesTotal + ' .', 'close');
    return false;
  }

  close() {
    this.dialog.closeAll();
  }

  // get the formgroup under payments form array
  getPaymentsFormGroup(index): FormGroup {
    const formGroup = this.paymentsList.controls[index] as FormGroup;
    return formGroup;
  }

  // get the formgroup under payments form array
  getSharesFormGroup(index): FormGroup {
    const formGroup = this.sharesList.controls[index] as FormGroup;
    return formGroup;
  }

  compareFn(c1: User, c2: User): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareGrpFn(c1: Group, c2: Group): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}

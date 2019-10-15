import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { User } from '../models/user';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
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
  grp: Group;
  //  exp = { amount: '' };
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
    private snackBar: MatSnackBar
  ) {
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
    if (this.grp) {
      this.groupsService.getGroupByID(this.grp.id).subscribe(group => {
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

  // shares formgroup
  createShare(): FormGroup {
    return this.formBuilder.group({
      spender: ['', Validators.compose([Validators.required])],
      amount: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*\.?[0-9]+$')])]
    });
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
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { User } from '../models/user';
import { Expense } from '../models/expense';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { FriendsService, UserService, GroupsService, AuthenticationService } from '../services';
import { Group } from '../models/group';
import { Payment } from '../models/payment';
import { Share } from '../models/share';

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
  isGroupExpense = true;
  paymentsList: FormArray;
  newPayment: Payment;
  sharesList: FormArray;
  newShare: Share;
  eligibleContributers: User[];
  constructor(
    public dialogRef: MatDialogRef<AddExpenseModalComponent>,
    private friendsService: FriendsService,
    private groupsService: GroupsService,
    private userService: UserService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    friendsService.getUserFriends().subscribe(friends => {
      this.friends = friends;
      authService.getUserProfile().subscribe(user => {
        this.friends.push(user);
      });
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
      detail: ['', Validators.required],
      amount: ['', Validators.required],
      group: [''],
      payments: this.formBuilder.array([this.createPayment()]),
      shares: this.formBuilder.array([this.createShare()])
    });
    this.paymentsList = this.addExpenseForm.get('payments') as FormArray;
    this.sharesList = this.addExpenseForm.get('shares') as FormArray;
  }

  // payments formgroup
  createPayment(): FormGroup {
    return this.formBuilder.group({
      payee: ['', Validators.compose([Validators.required])],
      amount: [null, Validators.compose([Validators.required])]
    });
  }

  // shares formgroup
  createShare(): FormGroup {
    return this.formBuilder.group({
      spender: ['', Validators.compose([Validators.required])],
      amount: [null, Validators.compose([Validators.required])]
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
    console.log(this.addExpenseForm.value);
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

import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FriendsService, UserService } from '../services';
import { User } from '../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef,  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-friend-modal',
  templateUrl: './add-friend-modal.component.html',
  styleUrls: ['./add-friend-modal.component.css']
})
export class AddFriendModalComponent implements OnInit {
  submitted = false;
  addFrndForm: FormGroup;
  friend: User;
  email: string;
  searchResults: Array<User> = [];

  constructor(
    public dialogRef: MatDialogRef<AddFriendModalComponent>,
    private friendsService: FriendsService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
    }

  get f() { return this.addFrndForm.controls; }

 ngOnInit() {
    this.addFrndForm = this.formBuilder.group({
      friend: ['', Validators.required]
    });
  }

  searchUserByEmail() {
    this.searchResults = [];
    this.userService.findByEmailID(this.email)
    .subscribe(result => {
      this.searchResults.push(result);
    },
    error => {
      this.snackBar.open(error.error.message, 'close');
    });
  }

  add() {
    this.friendsService.addUserFriend(this.friend).subscribe(() => {
      this.snackBar.open('adding friend successful', 'close', {duration: 3000});
      this.dialogRef.close();
    },
    error => {
      this.snackBar.open(error.error.message, 'close');
    });
  }

  close() {
    this.dialogRef.close(true);
  }

}

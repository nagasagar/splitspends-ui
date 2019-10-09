import { Component, OnInit, Optional } from '@angular/core';
import { FriendsService, GroupsService } from '../services';
import { User } from '../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-group-modal',
  templateUrl: './add-group-modal.component.html',
  styleUrls: ['./add-group-modal.component.css']
})
export class AddGroupModalComponent implements OnInit {
  submitted = false;
  friends: User[];
  addGrpForm: FormGroup;
  validationMessages = {
    username: [
      { type: 'required', message: 'Group name is required' }
    ]
  };
  get f() { return this.addGrpForm.controls; }
  constructor(
    public dialogRef: MatDialogRef<AddGroupModalComponent>,
    friendsService: FriendsService,
    private groupsService: GroupsService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
      friendsService.getUserFriends().subscribe(friends => this.friends = friends);
    }

  ngOnInit() {
    this.addGrpForm = this.formBuilder.group({
      name: ['', Validators.required],
      members: [[]]
    });
  }

  onSubmit() {
    this.submitted = true;

    this.groupsService.createGroup(this.addGrpForm.value).subscribe(() => {
      this.snackBar.open('group creation successful', 'close', {duration: 3000});
      this.dialogRef.close();
    },
    error => {
      this.snackBar.open(error.error.message, 'close');
    });
  }

  close() {
    this.dialog.closeAll();
  }

}

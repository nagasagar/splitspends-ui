import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { FriendsService } from '../services/friends.service';
import { AddFriendModalComponent } from '../add-friend-modal/add-friend-modal.component';
import { MatDialog, MatMenuTrigger, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends: User[];
  selectedFriend: User;
  @ViewChild(MatMenuTrigger, {static: false})
  menu: MatMenuTrigger;

  constructor(
    private friendsService: FriendsService,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.friendsService.getUserFriends()
    .subscribe(
      friends => {
        this.friends = friends;
        this.changeDetector.detectChanges();
      },
      error => {
        console.log(error);
      });
  }

  onTriggerMenu(friend: User) {
    this.selectedFriend = friend;
  }

  addFriend(): void {
    const dialogRef = this.dialog.open(AddFriendModalComponent, {
      width: '640px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  removeFriend(): void {
    this.friendsService.removeUserFriend(this.selectedFriend)
    .subscribe(
      () => {
        this.ngOnInit();
        this.snackBar.open('friend removed successfully !', 'close', {duration: 3000});
      },
      error => {
        this.snackBar.open(error.error.message , 'close', {duration: 3000});
      });
  }
}

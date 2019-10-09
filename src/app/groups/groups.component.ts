import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from '../models/group';
import { GroupsService } from '../services/groups.service';
import { AddGroupModalComponent } from '../add-group-modal/add-group-modal.component';
import { MatDialog, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Group[];
  selectedGroup: Group;
  constructor(
    private groupsService: GroupsService,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.groupsService.getUserGroups()
    .subscribe(
      groups => {
        this.groups = groups;
        this.changeDetector.detectChanges();
      },
      error => {
        console.log(error);
      } );
  }

  addNewGroup(): void {
    const dialogRef = this.dialog.open(AddGroupModalComponent, {
      width: '640px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  onTriggerMenu(group: Group) {
    this.selectedGroup = group;
  }

  viewDetails() {
    const link = ['/groupdetail', this.selectedGroup.id];
    this.router.navigate(link);
  }

  deleteGroup() {
    this.groupsService.deleteGroupByID(this.selectedGroup.id).subscribe(() => {
      this.snackBar.open('group deletion successful', 'close', {duration: 3000});
      this.ngOnInit();
    },
    error => {
      this.snackBar.open(error.error.message, 'close', {duration: 3000});
    });
  }

}

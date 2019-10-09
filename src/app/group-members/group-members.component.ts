import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../models/user';
import { Group } from '../models/group';
import { GroupsService, FriendsService } from '../services/';
import { MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.css']
})
export class GroupMembersComponent implements OnInit {

  group: Group;
  selectedMember: User;
  nonmembers: User[];
  friends: User[];
  potentialMember: User;

  constructor(
    private groupsService: GroupsService,
    private friendsService: FriendsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.groupsService.getGroupByID(+params.get('id')).subscribe(
        (group: Group) => {
          this.group = group;
          this.friendsService.getUserFriends().subscribe(
            friends => {
              this.friends = friends;
              const ids1 = this.friends.map(item => item.id);
              const ids2 = this.group.members.map(item => item.id);
              this.nonmembers = ids1.map((id, index) => {
                if (ids2.indexOf(id) < 0) {
                  return this.friends[index];
                }
              }).filter(item => item !== undefined);
            });
        });
    });
  }

  onTriggerMenu(member: User) {
    this.selectedMember = member;
  }

  addMember(): void {
    this.groupsService.addMemberToGroup(this.group, this.potentialMember).subscribe(() => {
      this.snackBar.open('adding member successful', 'close', {duration: 3000});
      this.potentialMember = null;
      this.ngOnInit();
    },
      error => {
        this.snackBar.open(error.error.message, 'close', {duration: 3000});
      });
  }

  removeMember(): void {
    this.groupsService.removeMemberFromGroup(this.group, this.selectedMember)
      .subscribe(
        () => {
          this.ngOnInit();
          this.snackBar.open('member removed successfully !', 'close', {duration: 3000});
        },
        error => {
          this.snackBar.open(error.error.message, 'close', {duration: 3000});
        });
  }

}

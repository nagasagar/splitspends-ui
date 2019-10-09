import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { GroupMembersComponent } from './group-members.component';
import { routes } from '../app-routing.module';
import { ActivatedRoute, Params, Data, Route, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatMenuModule, MatSelectModule } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';
import { of } from 'rxjs/internal/observable/of';
import { GroupsService, FriendsService } from '../services';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { throwError } from 'rxjs/internal/observable/throwError';

const grp = {
  id: 12,
  name: 'sample',
  members: [
    {
      id: 8,
      name: 'sample',
      email: 'sample@gmail.com'
    },
    {
      id: 101,
      name: 'sagar',
      email: 'sagar@gmail.com'
    }
  ]
};
const friends = [
  {
    id: 101,
    name: 'sagar',
    email: 'sagar@gmail.com'
  },
  {
    id: 8,
    name: 'sample',
    email: 'sample@gmail.com'
  },
  {
    id: 9,
    name: 'sireesha',
    email: 'sireesha@gmail.com'
  }
];
const groupServiceMock = {
  getGroupByID: jasmine.createSpy('getGroupByID').and.returnValue(of(grp)),
  removeMemberFromGroup: jasmine.createSpy('removeMemberFromGroup').and.returnValue(of({})),
  addMemberToGroup: jasmine.createSpy('addMemberToGroup').and.returnValue(of({}))
};

const friendServiceMock = {
  getUserFriends: jasmine.createSpy('getUserFriends').and.returnValue(of(friends))
};

describe('GroupMembersComponent', () => {
  let component: GroupMembersComponent;
  let fixture: ComponentFixture<GroupMembersComponent>;
  let groupService: GroupsService;
  let friendService: FriendsService;
  let matSnackBar: MatSnackBar;

  const queryParamMap = convertToParamMap({ id: '12' });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes([]), MatMenuModule, MatSelectModule,
        FormsModule, BrowserAnimationsModule, ScrollingModule],
      declarations: [GroupMembersComponent],
      providers: [
        MatSnackBar,
        { provide: GroupsService, useValue: groupServiceMock },
        { provide: FriendsService, useValue: friendServiceMock },
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: ActivatedRoute, useValue: { parent: { paramMap: of(queryParamMap) } } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMembersComponent);
    component = fixture.componentInstance;
    friendService = TestBed.get(FriendsService);
    groupService = TestBed.get(GroupsService);
    matSnackBar = TestBed.get(MatSnackBar);
    fixture.detectChanges();
  });

  it('non members are set correctly', () => {
    const nonMembers = [
      {
        id: 9,
        name: 'sireesha',
        email: 'sireesha@gmail.com'
      }
    ];
    expect(component).toBeTruthy();
    expect(component.nonmembers).toEqual(nonMembers);
  });

  it('should select user on trigger menu', () => {
    const member = {
      id: 8,
      name: 'sample',
      email: 'sample@gmail.com'
    };
    component.onTriggerMenu(member);
    expect(component.selectedMember).toBe(member);
  });

  it('should add member to group', () => {
    const potmem = {
      id: 8,
      name: 'sample',
      email: 'sample@gmail.com'
    };
    component.potentialMember = potmem;
    component.group = {
      id: 12,
      name: 'sample',
      members: [
        {
          id: 101,
          name: 'sagar',
          email: 'sagar@gmail.com'
        }
      ]
    };
    spyOn(component, 'ngOnInit');
    spyOn(matSnackBar, 'open');
    component.addMember();
    expect(groupService.addMemberToGroup).toHaveBeenCalledWith(component.group, potmem);
    expect(component.potentialMember).toBe(null);
    expect(matSnackBar.open).toHaveBeenCalledWith('adding member successful', 'close', {duration: 3000});
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should be able to remove a friend', () => {
    component.selectedMember = {
      id: 8,
      name: 'sample',
      email: 'sample@gmail.com'
    };
    component.group = {
      id: 12,
      name: 'sample',
      members: [
        {
          id: 101,
          name: 'sagar',
          email: 'sagar@gmail.com'
        }
      ]
    };
    spyOn(component, 'ngOnInit');
    spyOn(matSnackBar, 'open');
    component.removeMember();
    expect(groupService.removeMemberFromGroup).toHaveBeenCalledWith(component.group, component.selectedMember);
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(matSnackBar.open).toHaveBeenCalledWith('member removed successfully !', 'close', {duration: 3000});
  });
});

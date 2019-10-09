import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GroupsService } from './groups.service';
import { environment } from '../../environments/environment';
import { GroupInfo } from '../add-group-modal/group-info';
import { User } from '../models/user';
import { Group } from '../models/group';

describe('GroupsService', () => {
  let service: GroupsService;
  let httpTestingController: HttpTestingController;
  const groupInfo: GroupInfo = { name: 'dummy', members: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupsService]
    });
    service = TestBed.get(GroupsService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of friends', fakeAsync(() => {
    const response = [
      {
        id: 12,
        name: 'fab group',
        members: [
          {
            id: 11,
            name: 'sudaya',
            email: 'sudaya@gmail.com',
            imageUrl: null,
            emailVerified: true,
            provider: 'local'
          },
          {
            id: 10,
            name: 'subram',
            email: 'subram@gmail.com',
            imageUrl: null,
            emailVerified: false,
            provider: 'local'
          }
        ]
      },
      {
        id: 11,
        name: 'tab group',
        members: [
          {
            id: 13,
            name: 'surya',
            email: 'surya@gmail.com',
            imageUrl: null,
            emailVerified: true,
            provider: 'local'
          },
          {
            id: 10,
            name: 'subram',
            email: 'subram@gmail.com',
            imageUrl: null,
            emailVerified: false,
            provider: 'local'
          }
        ]
      }
    ];
    service.getUserGroups().subscribe((result: any) => {
      expect(result.length).toBe(2);
      expect(result[0].name).toBe('fab group');
      expect(result[1].name).toBe('tab group');
    });
    // Expect a call to this URL
    const req = httpTestingController.expectOne(environment.apiUrl + '/groups');
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
    // Respond with this data when called
    req.flush(response);
    // Call tick whic actually processes te response
    tick();
  }));

  it('should get group by ID', fakeAsync(() => {
    const response = {
      id: 12,
      name: 'fab group',
      members: [
        {
          id: 11,
          name: 'sudaya',
          email: 'sudaya@gmail.com',
          imageUrl: null,
          emailVerified: true,
          provider: 'local'
        },
        {
          id: 10,
          name: 'subram',
          email: 'subram@gmail.com',
          imageUrl: null,
          emailVerified: false,
          provider: 'local'
        }
      ]
    };
    const id = 12;
    service.getGroupByID(id).subscribe((result: any) => {
      expect(result.id).toBe(12);
      expect(result.name).toBe('fab group');
    });
    // Expect a call to this URL
    const url = `${environment.apiUrl}/groups/${id}`;
    const req = httpTestingController.expectOne(url);
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
    // Respond with this data when called
    req.flush(response);
    tick();
  }));

  it('should create a group', fakeAsync(() => {
    const response = {
      id: 101,
      name: 'new group',
      members: [
        {
          id: 11,
          name: 'sudaya',
          email: 'sudaya@gmail.com',
          imageUrl: null,
          emailVerified: true,
          provider: 'local'
        },
        {
          id: 10,
          name: 'subram',
          email: 'subram@gmail.com',
          imageUrl: null,
          emailVerified: false,
          provider: 'local'
        }
      ]
    };
    service.createGroup(groupInfo).subscribe((result: any) => {
      expect(result.id).toBe(101);
      expect(result.name).toBe('new group');
    });
    const req = httpTestingController.expectOne(environment.apiUrl + '/groups');
    expect(req.request.method).toEqual('POST');
    req.flush(response);
    tick();
  }));

  it('should create a group', fakeAsync(() => {
    const id = 12;
    service.deleteGroupByID(id).subscribe((result: any) => {
      // no response expected
    });
    const url = `${environment.apiUrl}/groups/${id}`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
    tick();
  }));

  it('should add member to a group', fakeAsync(() => {
    const user = new User(101, 'sagar', 'sagar@gmail.com');
    const group = new Group(1001, 'some group', []);
    const response = {
      id: 1001,
      name: 'some group',
      members: [{
        id: 101,
        name: 'sagar',
        email: 'sagar@gmail.com',
        imageUrl: null,
        emailVerified: false,
        provider: 'local'
      }]
    };
    service.addMemberToGroup(group, user).subscribe((result: any) => {
      expect(result.members.length).toBe(1);
    });
    const url = `${environment.apiUrl}/groups/${group.id}/addmember`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(response);
    tick();
  }));

  it('should remove member from a group', fakeAsync(() => {
    const user = new User(101, 'sagar', 'sagar@gmail.com');
    const group = new Group(1001, 'some group', [user]);
    const response = {
      id: 1001,
      name: 'some group',
      members: []
    };
    service.removeMemberFromGroup(group, user).subscribe((result: any) => {
      expect(result.members.length).toBe(0);
    });
    const url = `${environment.apiUrl}/groups/${group.id}/removemember`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(response);
    tick();
  }));
});

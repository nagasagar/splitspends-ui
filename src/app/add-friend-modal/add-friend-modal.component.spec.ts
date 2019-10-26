import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddFriendModalComponent } from './add-friend-modal.component';
import { MatDialogModule } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService, FriendsService } from '../services';
import { of, throwError } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';

describe('AddFriendModalComponent', () => {
  let component: AddFriendModalComponent;
  let fixture: ComponentFixture<AddFriendModalComponent>;
  let userService: UserService;
  let matSnackBar: MatSnackBar;
  let friendsService: FriendsService;

  const dialogMock = {
    close: () => { }
   };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        HttpClientTestingModule,
        RouterModule.forRoot([])],
      declarations: [AddFriendModalComponent],
      providers: [
        UserService,
        MatSnackBar,
        FriendsService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFriendModalComponent);
    userService = TestBed.get(UserService);
    friendsService = TestBed.get(FriendsService);
    matSnackBar = TestBed.get(MatSnackBar);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emptyform should be invalid', () => {
    component.ngOnInit();
    expect(component.addFrndForm.valid).toBeFalsy();
  });

  it('friend field validation', () => {
    component.ngOnInit();
    let errors = {};
    const friend = component.addFrndForm.controls.friend;
    expect(friend.valid).toBeFalsy();

    // Email field is required
    errors = friend.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeTruthy();

  });

  it('should search user by email ID', () => {
    component.email = 'fake@splitspends.com';
    const response = {
      id: 10101,
      name: 'Fake User',
      email: 'fake@splitspends.com',
      imageUrl: 'https://some-randon-url-toimage',
      emailVerified: true,
      provider: 'local'
    };
    spyOn(userService, 'findByEmailID').and.returnValue(of(response));
    component.searchUserByEmail();
    expect(component.searchResults.length).toBe(1);
    expect(component.searchResults[0].email).toBe('fake@splitspends.com');
  });

  it('should report error for invalid email', () => {
    // component.email = 'nonexisting@splitspends.com';
    const response = {
      headers: {
        normalizedNames: {},
        lazyUpdate: null
      },
      status: 404,
      statusText: 'OK',
      url: 'http://localhost:8080/user/email?email=nonexisting@splitspends.com', ok: false,
      name: 'HttpErrorResponse',
      message: 'Http failure response for http://localhost:8080/user/email?email=nonexisting@splitspends.com: 404 OK',
      error: {
        timestamp: '2019-09-28T21:29:23.577+0000', status: 404, error: 'Not Found',
        message: 'User not found with email : \'asdfg\'',
        trace: 'com.example.springsocial.exception.ResourceNotFoundException: User not found with email : \'nonexisting@splitspends.com\''
      }
    };
    spyOn(userService, 'findByEmailID').and.returnValue(throwError(response));
    spyOn(matSnackBar, 'open');
    component.searchUserByEmail();
    expect(component.searchResults.length).toBe(0);
    expect(matSnackBar.open).toHaveBeenCalledWith(response.error.message, 'close');
  });

  it('should add user', () => {
    const frnd = {
      id: 10101,
      name: 'Fake User',
      email: 'fake@splitspends.com',
      imageUrl: 'https://some-randon-url-toimage'
    };
    component.friend =  frnd;
    const response =  {
      id: 10101,
      name: 'Fake User',
      email: 'fake@splitspends.com',
      imageUrl: 'https://some-randon-url-toimage',
      emailVerified: true,
      provider: 'local'
    };
    spyOn(friendsService, 'addUserFriend').and.returnValue(of(response));
    spyOn(matSnackBar, 'open');
    component.add();
    expect(friendsService.addUserFriend).toHaveBeenCalledWith(frnd);
    expect(matSnackBar.open).toHaveBeenCalledWith('adding friend successful', 'close', {duration: 3000});
  });

  it('should report error if failed to add friend', () => {
    const frnd = {
      id: 10101,
      name: 'Fake User',
      email: 'fake@splitspends.com',
      imageUrl: null
    };
    component.friend =  frnd;
    const response =  {
     error: {
        timestamp: '2019-09-28T21:29:23.577+0000', status: 404, error: 'Not Found',
        message: 'User not found with email : \'asdfg\'',
        trace: 'com.example.springsocial.exception.ResourceNotFoundException: User not found with email : \'nonexisting@splitspends.com\''
      }
    };
    spyOn(friendsService, 'addUserFriend').and.returnValue(throwError(response));
    spyOn(matSnackBar, 'open');
    component.add();
    expect(friendsService.addUserFriend).toHaveBeenCalledWith(frnd);
    expect(matSnackBar.open).toHaveBeenCalledWith(response.error.message, 'close');
  });
});

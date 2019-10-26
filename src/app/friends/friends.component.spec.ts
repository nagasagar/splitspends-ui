import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FriendsComponent } from './friends.component';
import { MatDialogModule, MatSnackBar, MatMenuModule, MatDialogRef } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FriendsService } from '../services';
import { AddFriendModalComponent } from '../add-friend-modal/add-friend-modal.component';
import { of, throwError } from 'rxjs';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;
  let friendsService: FriendsService;
  let matSnackBar: MatSnackBar;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  const dialogMock = {
    close: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule, MatMenuModule,
        BrowserAnimationsModule, ScrollingModule],
      declarations: [FriendsComponent],
      providers:
        [
          FriendsService,
          MatSnackBar,
          { provide: MatDialogRef, useValue: dialogMock }
        ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    friendsService = TestBed.get(FriendsService);
    matSnackBar = TestBed.get(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select user on trigger menu', () => {
    const frnd = {
      id: 8,
      name: 'sample',
      email: 'sample@gmail.com',
      imageUrl: null,
      emailVerified: false,
      provider: 'local'
    };
    component.onTriggerMenu(frnd);
    expect(component.selectedFriend).toBe(frnd);
  });

  it('should open dialog', fakeAsync(() => {
    component.selectedFriend = {
      id: 8,
      name: 'sample',
      email: 'sample@gmail.com',
      imageUrl: null
    };
    spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);
    spyOn(component, 'ngOnInit');
    component.addFriend();
    dialogRefSpyObj.afterClosed().subscribe((result: any) => {
      expect(component.ngOnInit).toHaveBeenCalled();
    });
    expect(component.dialog.open).toHaveBeenCalledWith(AddFriendModalComponent, { width: '640px' });
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    tick();
  }));

  it('should be able to remove a friend', () => {
    component.selectedFriend = {
      id: 8,
      name: 'sample',
      email: 'sample@gmail.com',
      imageUrl: 'https://some-randon-url-toimage'
    };
    spyOn(friendsService, 'removeUserFriend').and.returnValue(of({}));
    spyOn(component, 'ngOnInit');
    spyOn(matSnackBar, 'open');
    component.removeFriend();
    expect(friendsService.removeUserFriend).toHaveBeenCalledWith(component.selectedFriend);
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(matSnackBar.open).toHaveBeenCalledWith('friend removed successfully !', 'close', {duration: 3000});
  });

  it('should be display error when failed to remove a friend', () => {
    component.selectedFriend = {
      id: 8,
      name: 'sample',
      email: 'sample@gmail.com',
      imageUrl: 'https://some-randon-url-toimage'
    };
    const response = {
      error: {
        message: 'removing a friend failed'
      }
    };
    spyOn(friendsService, 'removeUserFriend').and.returnValue(throwError(response));
    spyOn(component, 'ngOnInit');
    spyOn(matSnackBar, 'open');
    component.removeFriend();
    expect(friendsService.removeUserFriend).toHaveBeenCalledWith(component.selectedFriend);
    expect(component.ngOnInit).not.toHaveBeenCalled();
    expect(matSnackBar.open).toHaveBeenCalledWith(response.error.message , 'close', {duration: 3000});
  });
});

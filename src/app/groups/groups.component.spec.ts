import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GroupsComponent } from './groups.component';
import { MatDialogModule, MatSnackBar, MatMenuModule, MatDialogRef } from '@angular/material';
import { RouterModule, Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {APP_BASE_HREF} from '@angular/common';
import { GroupsService } from '../services';
import { of, throwError } from 'rxjs';
import { AddGroupModalComponent } from '../add-group-modal/add-group-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const router = {
  navigate: jasmine.createSpy('navigate')
};

describe('GroupsComponent', () => {
  let component: GroupsComponent;
  let fixture: ComponentFixture<GroupsComponent>;
  let groupsService: GroupsService;
  let matSnackBar: MatSnackBar;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  const dialogMock = {
    close: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([]), MatDialogModule, MatMenuModule,
      BrowserAnimationsModule, ScrollingModule],
      declarations: [ GroupsComponent ],
      providers: [
        GroupsService,
        MatSnackBar,
        { provide: Router, useValue: router },
        { provide: MatDialogRef, useValue: dialogMock },
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsComponent);
    component = fixture.componentInstance;
    matSnackBar = TestBed.get(MatSnackBar);
    groupsService = TestBed.get(GroupsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select user on trigger menu', () => {
    const grp = {
      id: 8,
      name: 'sample',
      members: []
    };
    component.onTriggerMenu(grp);
    expect(component.selectedGroup).toBe(grp);
  });

  it('should open dialog', fakeAsync(() => {
    component.selectedGroup = {
      id: 8,
      name: 'sample',
      members: []
    };
    spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);
    spyOn(component, 'ngOnInit');
    component.addNewGroup();
    dialogRefSpyObj.afterClosed().subscribe((result: any) => {
      expect(component.ngOnInit).toHaveBeenCalled();
    });
    expect(component.dialog.open).toHaveBeenCalledWith(AddGroupModalComponent, { width: '640px' });
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    tick();
  }));

  it('should be able to delete a group', () => {
    component.selectedGroup = {
      id: 8,
      name: 'sample',
      members: []
    };
    spyOn(groupsService, 'deleteGroupByID').and.returnValue(of({}));
    spyOn(component, 'ngOnInit');
    spyOn(matSnackBar, 'open');
    component.deleteGroup();
    expect(groupsService.deleteGroupByID).toHaveBeenCalledWith(component.selectedGroup.id);
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(matSnackBar.open).toHaveBeenCalledWith('group deletion successful', 'close', {duration: 3000});
  });

  it('should be display error when failed to remove a friend', () => {
    component.selectedGroup = {
      id: 8,
      name: 'sample',
      members: []
    };
    const response = {
      error: {
        message: 'removing a friend failed'
      }
    };
    spyOn(groupsService, 'deleteGroupByID').and.returnValue(throwError(response));
    spyOn(component, 'ngOnInit');
    spyOn(matSnackBar, 'open');
    component.deleteGroup();
    expect(groupsService.deleteGroupByID).toHaveBeenCalledWith(component.selectedGroup.id);
    expect(component.ngOnInit).not.toHaveBeenCalled();
    expect(matSnackBar.open).toHaveBeenCalledWith(response.error.message , 'close', {duration: 3000});
  });

  it('should navigate to details', () => {
    component.selectedGroup = {
      id: 8,
      name: 'sample',
      members: []
    };
    component.viewDetails();
    expect(router.navigate).toHaveBeenCalledWith(['/groupdetail', component.selectedGroup.id]);
  });
});

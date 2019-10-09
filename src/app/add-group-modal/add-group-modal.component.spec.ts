import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddGroupModalComponent } from './add-group-modal.component';
import { MatDialogModule } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { GroupsService } from '../services';
import { of, throwError } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';

describe('AddGroupModalComponent', () => {
  let component: AddGroupModalComponent;
  let fixture: ComponentFixture<AddGroupModalComponent>;
  let groupsService: GroupsService;
  let matSnackBar: MatSnackBar;
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
      declarations: [AddGroupModalComponent],
      providers:
        [
          GroupsService,
          MatSnackBar,
          { provide: MatDialogRef, useValue: dialogMock },
          { provide: APP_BASE_HREF, useValue: '/' }
        ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupModalComponent);
    component = fixture.componentInstance;
    groupsService = TestBed.get(GroupsService);
    matSnackBar = TestBed.get(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emptyform should be invalid', () => {
    component.ngOnInit();
    expect(component.addGrpForm.valid).toBeFalsy();
  });

  it('name field validation', () => {
    component.ngOnInit();
    let errors = {};
    const name = component.addGrpForm.controls.name;
    expect(name.valid).toBeFalsy();

    // Email field is required
    errors = name.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeTruthy();

  });


  it('should create group', () => {
    const grp = {
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
    component.addGrpForm.setValue(grp);
    spyOn(groupsService, 'createGroup').and.returnValue(of(grp));
    spyOn(matSnackBar, 'open');
    component.onSubmit();
    expect(groupsService.createGroup).toHaveBeenCalledWith(grp);
    expect(matSnackBar.open).toHaveBeenCalledWith('group creation successful', 'close', {duration: 3000});
  });

  it('should report error if failed to create group', () => {
    const grp = {
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
    component.addGrpForm.setValue(grp);
    const response =  {
     error: {
        timestamp: '2019-09-28T21:29:23.577+0000', status: 404, error: 'Not Found',
        message: 'grooup creation failed',
        trace: 'com.example.springsocial.exception.ResourceNotFoundException: User not found with email : \'nonexisting@splitspends.com\''
      }
    };
    spyOn(groupsService, 'createGroup').and.returnValue(throwError(response));
    spyOn(matSnackBar, 'open');
    component.onSubmit();
    expect(groupsService.createGroup).toHaveBeenCalledWith(grp);
    expect(matSnackBar.open).toHaveBeenCalledWith(response.error.message, 'close');
  });

});

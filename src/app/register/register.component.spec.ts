import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import {APP_BASE_HREF} from '@angular/common';
import {TokenService, AuthenticationService} from '../services';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

class DummyComponent {}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthenticationService;
  let tokenService: TokenService;
  let matSnackBar: MatSnackBar;
  let de: DebugElement;

  const router = {
    navigate: jasmine.createSpy('navigate')
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:
      [ ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes([{ path: 'login', component: DummyComponent }])
      ],
      declarations: [ RegisterComponent ],
      providers: [TokenService, AuthenticationService, MatSnackBar,
        { provide: Router, useValue: router },
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthenticationService);
    tokenService = TestBed.get(TokenService);
    matSnackBar = TestBed.get(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to / when token is available already', () => {
    spyOn(tokenService, 'getToken').and.returnValue('somedummytoken');
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('emptyform should be invalid', () => {
    component.ngOnInit();
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('email field validation', () => {
    component.ngOnInit();
    let errors = {};
    const email = component.registerForm.controls.email;
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue('test');
    errors = email.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeFalsy();
    // tslint:disable-next-line: no-string-literal
    expect(errors['pattern']).toBeTruthy();

    // Set email to valid
    email.setValue('test@verify.com');
    errors = email.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeFalsy();
    // tslint:disable-next-line: no-string-literal
    expect(errors['pattern']).toBeFalsy();
  });

  it('name field validity', () => {
    component.ngOnInit();
    let errors = {};
    const name = component.registerForm.controls.name;

    // name field is required
    errors = name.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeTruthy();

    // Set username to something correct
    name.setValue('nsagar');
    errors = name.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeFalsy();
    // tslint:disable-next-line: no-string-literal
    expect(errors['minlength']).toBeFalsy();
  });

  it('password field validity', () => {
    component.ngOnInit();
    let errors = {};
    const password = component.registerForm.controls.password;

    // Email field is required
    errors = password.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeTruthy();

    // Set email to something
    password.setValue('12345');
    errors = password.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeFalsy();
    // tslint:disable-next-line: no-string-literal
    expect(errors['minlength']).toBeTruthy();

    // Set email to something correct
    password.setValue('123456789');
    errors = password.errors || {};
    // tslint:disable-next-line: no-string-literal
    expect(errors['required']).toBeFalsy();
    // tslint:disable-next-line: no-string-literal
    expect(errors['minlength']).toBeFalsy();
  });

  it('test navigation to login page', () => {
    component.ngOnInit();
    de = fixture.debugElement.query(By.css('button'));
    de.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should be able to register', () => {
    const email = component.registerForm.controls.email;
    const name = component.registerForm.controls.name;
    const password = component.registerForm.controls.password;
    password.setValue('123456789');
    name.setValue('nsagar');
    email.setValue('test@verify.com');
    spyOn(authService, 'register').and.returnValue(of({}));
    spyOn(matSnackBar, 'open');
    component.onSubmit();
    expect(authService.register).toHaveBeenCalled();
    expect(matSnackBar.open).toHaveBeenCalledWith('Registration successful', 'close', {duration: 3000});
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});


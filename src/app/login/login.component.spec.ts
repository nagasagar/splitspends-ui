import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { MatSnackBarModule, } from '@angular/material';
import {APP_BASE_HREF} from '@angular/common';
import {TokenService, UserService, AuthenticationService} from '../services';
import {of} from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TOKEN_KEY } from '../constants';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let tokenService: TokenService;
  let userService: UserService;
  let de: DebugElement;

  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ LoginComponent ],
      providers: [
        FormBuilder, TokenService, AuthenticationService, UserService,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: Router, useValue: router},
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthenticationService);
    tokenService = TestBed.get(TokenService);
    userService = TestBed.get(UserService);
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
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validation', () => {
    component.ngOnInit();
    let errors = {};
    const email = component.loginForm.controls.email;
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

  it('password field validity', () => {
    component.ngOnInit();
    let errors = {};
    const password = component.loginForm.controls.password;

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

  it('submitting a form gets token and saves userprofile', () => {
    component.ngOnInit();
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls.email.setValue('sample@gmail.com');
    component.loginForm.controls.password.setValue('sample');
    expect(component.loginForm.valid).toBeTruthy();
    const authResponse = {accessToken: 'dabbatoken', tokenType: 'Bearer'};
    spyOn(authService, 'attempAuth').and.returnValue(of(authResponse));
    const userResponse = {
      id: 101,
      name: 'jasmine karma',
      email: 'jasmine@karma.com',
      imageUrl: 'https://myimageurl',
      emailVerified: false,
      provider: 'angular'
  };
    spyOn(authService, 'getUserProfile').and.returnValue(of(userResponse));
    spyOn(userService, 'saveUserProfile').and.returnValue();
    spyOn(tokenService, 'saveToken').and.returnValue();
    // Trigger the login function
    component.onSubmit();
    expect(tokenService.saveToken).toHaveBeenCalledWith(authResponse.accessToken);
    expect(userService.saveUserProfile).toHaveBeenCalledTimes(1);
    // Now we can check to make sure the emitted value is correct
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('test navigation to register page', () => {
    component.ngOnInit();
    de = fixture.debugElement.query(By.css('button'));
    de.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });


});

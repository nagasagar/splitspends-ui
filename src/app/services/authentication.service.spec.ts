import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService, TokenService } from '.';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../../environments/environment';
import { AuthLoginInfo } from '../login/login-info';
import { RegisterInfo } from '../register/register-info';

describe('AuthenticationService', () => {

  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;
  let tokenService: TokenService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [ TokenService, AuthenticationService, { provide: APP_BASE_HREF, useValue: '/' }]
    });
    service = TestBed.get(AuthenticationService);
    tokenService = TestBed.get(TokenService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return userProfile', fakeAsync(() => {
    const response = {
      id: 10101,
      name: 'Fake User',
      email: 'fake@splitspends.com',
      imageUrl: 'https://some-randon-url-toimage',
      emailVerified: true,
      provider: 'local'
    };
    service.getUserProfile().subscribe((result: any) => {
      expect(result).toBe(response);
    });
    // Expect a call to this URL
    const req = httpTestingController.expectOne(environment.apiUrl + '/users/me');
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
    // Respond with this data when called
    req.flush(response);
    // Call tick whic actually processes te response
    tick();

  }));

  it('attemptAuth should call /auth/login', fakeAsync(() => {
    const loginInfo: AuthLoginInfo = {email: 'sasa@sas.com', password: 'pass'};
    const authResponse = {accessToken: 'dabbatoken', tokenType: 'Bearer'};
    service.attempAuth(loginInfo).subscribe((result: any) => {
      expect(result).toBe(authResponse);
    });
    const req = httpTestingController.expectOne(environment.apiUrl + '/auth/login');
    expect(req.request.method).toEqual('POST');
    req.flush(authResponse);
    tick();

  }));

  it('register should call /auth/signup', fakeAsync(() => {
    const registerInfo: RegisterInfo = {name: 'sasa', email: 'sasa@sas.com', password: 'pass'};
    const authResponse = {accessToken: 'dabbatoken', tokenType: 'Bearer'};
    service.register(registerInfo).subscribe((result: any) => {
      expect(result).toBe(authResponse);
    });
    const req = httpTestingController.expectOne(environment.apiUrl + '/auth/signup');
    expect(req.request.method).toEqual('POST');
    req.flush(authResponse);
    tick();

  }));

  it('logout should call ', fakeAsync(() => {
    const nextSpy = spyOn(service.authChange, 'next');
    spyOn(tokenService, 'logout').and.returnValue();
    service.logout();
    expect(nextSpy).toHaveBeenCalled();
    expect(tokenService.logout).toHaveBeenCalledWith();
  }));

});

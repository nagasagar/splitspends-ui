import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { environment } from '../../environments/environment';
import { AuthenticationService, TokenService } from '../services';
import { of } from 'rxjs';


describe('UserService', () => {

  let service: UserService ;
  let authService: AuthenticationService ;
  let tokenService: TokenService ;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
     TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterModule.forRoot([])],
    providers: [AuthenticationService, UserService, TokenService, {provide: APP_BASE_HREF, useValue: '/'}]
     });
     service = TestBed.get(UserService);
     authService = TestBed.get(AuthenticationService);
     tokenService = TestBed.get(TokenService);
     httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save user profile', () => {
    const response = {
      id: 10101,
      name: 'Fake User',
      email: 'fake@splitspends.com',
      imageUrl: 'https://some-randon-url-toimage',
      emailVerified: true,
      provider: 'local'
    };
    spyOn(authService, 'getUserProfile').and.returnValue(of(response));
    spyOn(tokenService, 'saveUsername');
    spyOn(tokenService, 'saveAuthority');
    spyOn(tokenService, 'saveImageUrl');
    spyOn(tokenService, 'saveEmail');
    service.saveUserProfile();
    expect(authService.getUserProfile).toHaveBeenCalledWith();
    expect(tokenService.saveUsername).toHaveBeenCalledWith('Fake User');
    expect(tokenService.saveImageUrl).toHaveBeenCalledWith('https://some-randon-url-toimage');
    expect(tokenService.saveEmail).toHaveBeenCalledWith('fake@splitspends.com');

  });

  it('should search user by emailID', fakeAsync(() => {
    const response = {
      id: 10101,
      name: 'Fake User',
      email: 'fake@splitspends.com',
      imageUrl: 'https://some-randon-url-toimage',
      emailVerified: true,
      provider: 'local'
    };
    const email = 'fake@splitspends.com';
    service.findByEmailID(email).subscribe((result: any) => {
      expect(result).toBe(response);
    });
    // Expect a call to this URL
    const req = httpTestingController.expectOne(environment.apiUrl + '/users/email?email=' + email);
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
    // Respond with this data when called
    req.flush(response);
    // Call tick whic actually processes te response
    tick();
    httpTestingController.verify();
  }));

});

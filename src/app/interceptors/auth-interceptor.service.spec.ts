import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthInterceptorService } from './auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { FriendsService , TokenService } from '../services';
import { environment } from '../../environments/environment';

describe('AuthInterceptorService', () => {
  let httpMock: HttpTestingController;
  let friendsService: FriendsService;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [
        FriendsService,
        TokenService,
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    friendsService = TestBed.get(FriendsService);
    tokenService = TestBed.get(TokenService);
  });

  it('should be created', () => {
    const service: AuthInterceptorService = TestBed.get(AuthInterceptorService);
    expect(service).toBeTruthy();
  });

  it('should not add an Authorization header when not loggedin', () => {
    spyOn(tokenService, 'getToken').and.returnValue(null);
    friendsService.getUserFriends().subscribe(response => {
      // not intrested
    });

    const httpRequest = httpMock.expectOne(environment.apiUrl + '/friends');
    expect(httpRequest.request.method).toEqual('GET');
    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
  });

  it('should add an Authorization header when loggedin', () => {
    spyOn(tokenService, 'getToken').and.returnValue('sometoken');
    friendsService.getUserFriends().subscribe(response => {
      // not intrested
    });

    const httpRequest = httpMock.expectOne(environment.apiUrl + '/friends');
    expect(httpRequest.request.method).toEqual('GET');
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  });
});

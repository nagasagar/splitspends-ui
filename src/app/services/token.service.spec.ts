import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { TokenService } from './token.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { TOKEN_KEY, USERNAME_KEY, AUTHORITIES_KEY, EMAIL_KEY, IMAGE_URL } from '../constants';

class DummyComponent { }

describe('TokenService', () => {
  let service: TokenService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'login', component: DummyComponent }])],
      providers: [TokenService, { provide: APP_BASE_HREF, useValue: '/' }]
    });
    service = TestBed.get(TokenService);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should logout', () => {
    spyOn(localStorage, 'clear');
    spyOn(router, 'navigate');
    service.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(localStorage.clear).toHaveBeenCalledWith();
  });

  it('should save token', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(localStorage, 'setItem');
    service.saveToken('dummytoken');
    expect(localStorage.removeItem).toHaveBeenCalledWith(TOKEN_KEY);
    expect(localStorage.setItem).toHaveBeenCalledWith(TOKEN_KEY, 'dummytoken');
  });

  it('should get Token', () => {
    spyOn(localStorage, 'getItem').and.returnValue('dummy token');
    service.getToken();
    expect(localStorage.getItem).toHaveBeenCalledWith(TOKEN_KEY);
  });

  it('should save username', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(localStorage, 'setItem');
    service.saveUsername('sample');
    expect(localStorage.removeItem).toHaveBeenCalledWith(USERNAME_KEY);
    expect(localStorage.setItem).toHaveBeenCalledWith(USERNAME_KEY, 'sample');
  });

  it('should get username', () => {
    spyOn(localStorage, 'getItem');
    service.getUsername();
    expect(localStorage.getItem).toHaveBeenCalledWith(USERNAME_KEY);
  });

  it('should save email', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(localStorage, 'setItem');
    service.saveEmail('dummy@gmail.com');
    expect(localStorage.removeItem).toHaveBeenCalledWith(EMAIL_KEY);
    expect(localStorage.setItem).toHaveBeenCalledWith(EMAIL_KEY, 'dummy@gmail.com');
  });

  it('should get email', () => {
    spyOn(localStorage, 'getItem');
    service.getEmail();
    expect(localStorage.getItem).toHaveBeenCalledWith(EMAIL_KEY);
  });

  it('should save authority', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(localStorage, 'setItem');
    service.saveAuthority('dummyvalue');
    expect(localStorage.removeItem).toHaveBeenCalledWith(AUTHORITIES_KEY);
    expect(localStorage.setItem).toHaveBeenCalledWith(AUTHORITIES_KEY, 'dummyvalue');
  });

  it('should get authority', () => {
    spyOn(localStorage, 'getItem');
    service.getAuthority();
    expect(localStorage.getItem).toHaveBeenCalledWith(AUTHORITIES_KEY);
  });

  it('should save imageurl', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(localStorage, 'setItem');
    service.saveImageUrl('http://some-dummy/url');
    expect(localStorage.removeItem).toHaveBeenCalledWith(IMAGE_URL);
    expect(localStorage.setItem).toHaveBeenCalledWith(IMAGE_URL, 'http://some-dummy/url');
  });

  it('should get imageurl', () => {
    spyOn(localStorage, 'getItem');
    service.getImageUrl();
    expect(localStorage.getItem).toHaveBeenCalledWith(IMAGE_URL);
  });
});

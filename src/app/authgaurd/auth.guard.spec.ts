import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { APP_BASE_HREF } from '@angular/common';
import { TokenService } from '../services';

class MockRouter {
  navigate(path) { }
}

class MockActivatedRouteSnapshot {
  // tslint:disable-next-line:variable-name
  private _data: any;
  get data() {
    return this._data;
  }
}

class MockRouterStateSnapshot {
  url = '/';
}

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let tokenService: TokenService;
  let router: Router;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        TokenService,
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRouteSnapshot, useClass: MockActivatedRouteSnapshot },
        { provide: RouterStateSnapshot, useClass: MockRouterStateSnapshot }
      ]
    }).compileComponents();
    authGuard = TestBed.get(AuthGuard);
    tokenService = TestBed.get(TokenService);
    route = TestBed.get(ActivatedRouteSnapshot);
    router = TestBed.get(Router);
    state = TestBed.get(RouterStateSnapshot);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should be able to hit route when user is logged in', () => {
    spyOn(tokenService, 'getToken').and.returnValue('dummytoken');
    expect(authGuard.canActivate(route, state)).toBe(true);
  });

  it('should not be able to hit route when user is not logged in', () => {
    spyOn(tokenService, 'getToken').and.returnValue(null);
    spyOn(router, 'navigate');
    expect(authGuard.canActivate(route, state)).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: Object({ returnUrl: '/' }) });
  });
});

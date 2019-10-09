import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { OAuth2RedirectHandlerComponent } from './oauth2-redirect-handler.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { routes } from '../app-routing.module';
import { AuthenticationService, TokenService, UserService } from '../services';

const router = {
  navigate: jasmine.createSpy('navigate')
};
describe('OAuth2RedirectHandlerComponent', () => {
  let component: OAuth2RedirectHandlerComponent;
  let fixture: ComponentFixture<OAuth2RedirectHandlerComponent>;
  let route: ActivatedRoute;
  let authenticationService: AuthenticationService;
  let tokenService: TokenService;
  let userService: UserService;
  const queryParamMap = convertToParamMap({ token: 'abc123' });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot(routes), HttpClientTestingModule],
      declarations: [OAuth2RedirectHandlerComponent],
      providers: [
        AuthenticationService,
        TokenService,
        UserService,
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap } } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OAuth2RedirectHandlerComponent);
    component = fixture.componentInstance;
    route = TestBed.get(ActivatedRoute);
    authenticationService = TestBed.get(AuthenticationService);
    tokenService = TestBed.get(TokenService);
    userService = TestBed.get(UserService);
  });

  it('should navigate to home when token is available', () => {
    spyOn(authenticationService.authChange, 'next');
    spyOn(tokenService, 'saveToken');
    spyOn(userService, 'saveUserProfile');
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(authenticationService.authChange.next).toHaveBeenCalledWith(true);
    expect(tokenService.saveToken).toHaveBeenCalledWith('abc123');
    expect(userService.saveUserProfile).toHaveBeenCalledWith();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to login when token is not available', () => {
    spyOn(authenticationService.authChange, 'next');
    spyOn(route.snapshot.queryParamMap, 'get').and.returnValue(null);
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(authenticationService.authChange.next).toHaveBeenCalledWith(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});

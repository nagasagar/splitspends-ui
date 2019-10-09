import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router, ActivatedRoute, ActivatedRouteSnapshot, UrlSegment, Params, Data, Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { APP_BASE_HREF } from '@angular/common';
import { TokenService, AuthenticationService } from '../services';
import { routes } from '../app-routing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Type } from '@angular/core';
import { By } from '@angular/platform-browser';

const router = {
  navigate: jasmine.createSpy('navigate')
};

export class MockActivatedRoute implements ActivatedRoute {
  paramMap: Observable<import('@angular/router').ParamMap>;
  queryParamMap: Observable<import('@angular/router').ParamMap>;
  snapshot: ActivatedRouteSnapshot;
  url: Observable<UrlSegment[]>;
  params: Observable<Params>;
  queryParams: Observable<Params>;
  fragment: Observable<string>;
  data: Observable<Data>;
  outlet: string;
  component: Type<any>|string;
  routeConfig: Route = {};
  root: ActivatedRoute;
  parent: ActivatedRoute;
  firstChild: ActivatedRoute;
  children: ActivatedRoute[] = [];
  pathFromRoot: ActivatedRoute[];
  toString(): string {
      return '';
  }
}

describe('HomeComponent', () => {
  let location: Location;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let tokenService: TokenService;
  let authenticationService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot(routes)],
      declarations: [HomeComponent],
      providers: [
        TokenService,
        AuthenticationService,
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    tokenService = TestBed.get(TokenService);
    authenticationService = TestBed.get(AuthenticationService);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const els = fixture.debugElement.queryAll(By.css('*'));
    console.log(els);
    });


  // TODO : need help in testing mat-tabs, i would like to test that switching on to the tab changes the location correctly.
});

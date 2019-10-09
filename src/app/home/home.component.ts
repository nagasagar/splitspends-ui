import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy  } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AuthenticationService, TokenService } from '../services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {

  username: string;
  isViewInitialized = false;
  navLinks = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private tokenService: TokenService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.username = this.tokenService.getUsername();
    this.navLinks = (
      this.route.routeConfig && this.route.routeConfig.children ?
      this.buildNavItems(this.route.routeConfig.children) :
      []
    );
  }
  ngAfterViewInit() {
    this.changeDetector.detectChanges();
    this.isViewInitialized = true;
  }

  buildNavItems(routes: Routes) {
    return (routes)
      .filter(route => route.data)
      .map(({ path = '', data }) => ({
        path,
        label: data.label,
        icon: data.icon
      }));
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}

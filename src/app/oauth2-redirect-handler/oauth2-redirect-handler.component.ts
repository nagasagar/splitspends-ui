import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, TokenService, UserService } from '../services';

@Component({
  selector: 'app-oauth2-redirect-handler',
  template: '<h2>This is OAuth2RedirectHandler page.</h2>'
})
export class OAuth2RedirectHandlerComponent implements OnInit {
  private token = '';
  private error = '';

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private tokenService: TokenService,
              private router: Router,
              private authenticationService: AuthenticationService) { }

    ngOnInit() {
      this.token = this.route.snapshot.queryParamMap.get('token');
      this.error = this.route.snapshot.queryParamMap.get('error');
      if (this.token !== null) {
          this.authenticationService.authChange.next(true);
          this.tokenService.saveToken(this.token);
          this.userService.saveUserProfile();
          this.router.navigate(['/home']);
      } else {
          this.authenticationService.authChange.next(false);
          this.router.navigate(['/login']);
      }
  }

}

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from 'events';
import { AuthenticationService, TokenService, UserService } from '../services';
import { MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  errorMessage = '';
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  @Input() notify = new EventEmitter();
  errorSubscription: Subscription;

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {

    // redirect to home if already logged in
    if (this.tokenService.getToken()) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.pattern('[^@]*@[^@]*')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.errorSubscription = this.authenticationService.authError.subscribe(error => {
      console.log(error);
      if (error !== '') {
        this.errorMessage = error;
        this.snackBar.open(error, 'close', {duration: 3000});
      }
    });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.attempAuth({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe(
      data => {
        this.tokenService.saveToken(data.accessToken);
        this.authenticationService.authChange.next(true);
        this.userService.saveUserProfile();
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.snackBar.open(this.errorMessage , 'close', {duration: 3000});
        this.loading = false;
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}

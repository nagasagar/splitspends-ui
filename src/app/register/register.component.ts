import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, TokenService } from '../services';
import { first } from 'rxjs/operators';
import { MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  validationMessages = {
    username: [
      { type: 'required', message: 'Username is required' }
    ],
    email: [
      { type: 'required', message: 'Email is required' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters long' }
    ]
  };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
     // redirect to home if already logged in
    if (this.tokenService.getToken()) {
      this.router.navigate(['/']);
    }
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[^@]*@[^@]*')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.snackBar.open('Registration successful', 'close', {duration: 3000});
          this.router.navigate(['/login']);
        },
        error => {
          this.snackBar.open(error.error.message, 'close');
          this.loading = false;
        });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}

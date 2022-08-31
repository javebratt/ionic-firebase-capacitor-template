import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthCredentials } from '../authentication.models';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  readonly authForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
  });
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  login({ email, password }: AuthCredentials): void {
    // TODO: Add error handling for login.
    // 1. Check the error that comes from the service.
    // 2. Show the user an alert with a generic message
    // independently if it is wrong password or no user found.
    // 3. If the error is something different, explain.
    this.authenticationService.login({ email, password }).then(() => {
      this.router.navigateByUrl('');
    });
  }
}

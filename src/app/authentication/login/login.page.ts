import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { isPlatform } from '@ionic/angular';
import { AuthCredentials } from '../authentication.models';
import { AlertService } from '../../shared/services/alert.service';

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
    private readonly router: Router,
    private readonly alertService: AlertService
  ) {}

  login({ email, password }: AuthCredentials): void {
    this.authenticationService
      .login({ email, password })
      .then((userCredential) => {
        this.router.navigateByUrl('');
      })
      .catch((error) => {
        this.alertService.presentInformationAlert(error);
      });
  }

  loginWithGoogle() {
    if (!isPlatform('capacitor')) {
      this.authenticationService.loginWithGoogle();
    } else {
      console.log('I will implement native google login');
    }
  }

  loginWithApple() {
    if (!isPlatform('capacitor')) {
      console.log('I will implement web apple login');
    } else {
      console.log('I will implement native apple login');
    }
  }
}

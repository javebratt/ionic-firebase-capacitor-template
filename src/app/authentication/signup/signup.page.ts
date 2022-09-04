import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { isPlatform } from '@ionic/angular';
import { AuthCredentials } from '../authentication.models';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  readonly authForm = this.formBuilder.group({
    name: ['', Validators.required],
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

  signup({ email, password, name }: AuthCredentials): void {
    this.authenticationService
      .signup({ email, password, name })
      .then(() => {
        this.router.navigateByUrl('');
      })
      .catch((error) => {
        this.alertService.presentInformationAlert(error);
      });
  }

  signupWithGoogle() {
    if (!isPlatform('capacitor')) {
      this.authenticationService.loginWithGoogle();
    } else {
      console.log('I will implement native google signup');
    }
  }

  signupWithApple() {
    if (!isPlatform('capacitor')) {
      console.log('I will implement web apple signup');
    } else {
      console.log('I will implement native apple signup');
    }
  }
}

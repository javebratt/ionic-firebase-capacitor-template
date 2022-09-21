import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatform } from '@ionic/angular';
import { AlertService } from '../../shared/services/alert.service';
import { AuthCredentials } from '../authentication.models';
import { AuthenticationService } from '../authentication.service';

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

  async signup({ email, password, name }: AuthCredentials): Promise<void> {
    try {
      await this.authenticationService.signup({ email, password, name });
      this.router.navigateByUrl('');
    } catch (error) {
      this.alertService.presentInformationAlert(error as string);
    }
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

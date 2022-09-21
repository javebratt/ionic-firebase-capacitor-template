import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../shared/services/alert.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage {
  readonly authForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
  });
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly alertService: AlertService
  ) {}

  async reset(email: string): Promise<void> {
    try {
      await this.authenticationService.resetPassword(email);
      this.alertService.presentInformationAlert(
        `If there is an account with that email we'll send a confirmation link in a few moments`
      );
    } catch (error) {
      this.alertService.presentInformationAlert(error as string);
    }
  }
}

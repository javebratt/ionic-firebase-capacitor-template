import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthenticationPageRoutingModule } from './authentication-routing.module';

import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { ResetPage } from './reset/reset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthenticationPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginPage, SignupPage, ResetPage],
})
export class AuthenticationPageModule {}

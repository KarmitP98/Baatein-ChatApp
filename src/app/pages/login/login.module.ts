import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { MatInputModule } from "@angular/material/input";
import { SignupPageComponentModule } from "../signup-page/signup-page.module";

@NgModule({
              imports : [
                  CommonModule,
                  FormsModule,
                  IonicModule,
                  LoginPageRoutingModule,
                  MatInputModule,
                  SignupPageComponentModule
              ],
  declarations: [LoginPage]
})
export class LoginPageModule {}

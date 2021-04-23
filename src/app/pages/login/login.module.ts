import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule( {
               imports: [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   LoginPageRoutingModule,
                   MatFormFieldModule,
                   MatIconModule,
                   MatInputModule,
               ],
               declarations: [ LoginPage ],
           } )
export class LoginPageModule {}

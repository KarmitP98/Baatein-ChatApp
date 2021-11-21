import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsPageRoutingModule } from './contacts-routing.module';

import { ContactsPage } from './contacts.page';
import { ContactIconComponent } from "../../../components/contact-icon/contact-icon.component";
import { MatInputModule } from "@angular/material/input";
import { SignupPageComponentModule } from "../../signup-page/signup-page.module";

@NgModule({
              imports : [
                  CommonModule,
                  FormsModule,
                  IonicModule,
                  ContactsPageRoutingModule,
                  MatInputModule,
                  SignupPageComponentModule
              ],
              declarations : [ ContactsPage, ContactIconComponent ]
          })
export class ContactsPageModule {}

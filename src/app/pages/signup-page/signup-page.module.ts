import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SignupPageComponent } from "./signup-page.component";
import { SignupPageRoutingModule } from "./signup-page-routing.module";

@NgModule( {
             imports : [ CommonModule, FormsModule, IonicModule, SignupPageRoutingModule ],
             declarations : [ SignupPageComponent ],
             exports : [ SignupPageComponent ]
           } )
export class SignupPageComponentModule {}

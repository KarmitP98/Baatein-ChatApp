import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SignupPageComponent } from "./signup-page.component";
import { SignupPageRoutingModule } from "./signup-page-routing.module";
import { MatInputModule } from "@angular/material/input";
import { LoaderComponent } from "../../components/loader/loader.component";

@NgModule( {
               imports : [ CommonModule, FormsModule, IonicModule, SignupPageRoutingModule, MatInputModule ],
               declarations : [ SignupPageComponent, LoaderComponent ],
               exports : [ SignupPageComponent ]
           } )
export class SignupPageComponentModule {}

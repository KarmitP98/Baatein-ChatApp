import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";
import { ChatItemComponent } from "../../../components/chat-item/chat-item.component";
import { SignupPageComponentModule } from "../../signup-page/signup-page.module";

@NgModule( {
               imports : [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   HomePageRoutingModule,
                   SignupPageComponentModule
               ],
               declarations : [ HomePage, ChatItemComponent ]
           } )
export class HomePageModule {}

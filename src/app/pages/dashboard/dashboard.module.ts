import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DashboardPageRoutingModule } from "./dashboard-routing.module";

import { DashboardPage } from "./dashboard.page";
import { ChatComponent } from "../../components/chat/chat.component";
import { InitialPipe } from "../../pipes/initial.pipe";

@NgModule( {
               imports : [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   DashboardPageRoutingModule
               ],
               declarations : [ DashboardPage, ChatComponent, InitialPipe ]
           } )
export class DashboardPageModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DashboardPageRoutingModule } from "./dashboard-routing.module";

import { DashboardPage } from "./dashboard.page";
import { ChatComponent } from "../../components/chat/chat.component";
import { InitialPipe } from "../../pipes/initial.pipe";
import { TextLayoutComponent } from "../../components/text-layout/text-layout.component";
import { MatBadgeModule } from "@angular/material/badge";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule( {
               imports : [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   DashboardPageRoutingModule,
                   MatBadgeModule,
                   MatTooltipModule
               ],
               declarations : [ DashboardPage, ChatComponent, InitialPipe, TextLayoutComponent ]
           } )
export class DashboardPageModule {}

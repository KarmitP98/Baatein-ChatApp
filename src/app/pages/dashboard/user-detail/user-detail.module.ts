import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { UserDetailPageRoutingModule } from "./user-detail-routing.module";

import { UserDetailPage } from "./user-detail.page";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";

@NgModule( {
               imports : [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   UserDetailPageRoutingModule,
                   MatInputModule,
                   MatIconModule
               ],
               declarations : [ UserDetailPage ]
           } )
export class UserDetailPageModule {}

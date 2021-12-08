import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SettingsPageRoutingModule } from "./settings-routing.module";

import { SettingsPage } from "./settings.page";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@NgModule( {
               imports : [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   SettingsPageRoutingModule,
                   MatListModule,
                   MatButtonModule,
                   MatIconModule,
                   MatInputModule
               ],
               declarations : [ SettingsPage ]
           } )
export class SettingsPageModule {}

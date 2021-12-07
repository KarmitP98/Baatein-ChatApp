import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ChatPageRoutingModule } from "./chat-routing.module";

import { ChatPage } from "./chat.page";
import { SignupPageComponentModule } from "../signup-page/signup-page.module";
import { ChatComponent } from "../../components/chat-page/chat.component";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MessageComponent } from "../../components/message/message.component";

@NgModule( {
               imports : [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   ChatPageRoutingModule,
                   SignupPageComponentModule,
                   MatInputModule,
                   MatButtonModule
               ],
               declarations : [ ChatPage, ChatComponent, MessageComponent ]
           } )
export class ChatPageModule {}

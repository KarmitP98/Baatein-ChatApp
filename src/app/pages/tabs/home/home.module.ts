import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";
import { ChatItemComponent } from "../../../components/chat-item/chat-item.component";
import { SignupPageComponentModule } from "../../signup-page/signup-page.module";
import { StoriesComponent } from "../../../components/stories/stories.component";
import { StoryItemComponent } from "../../../components/story-item/story-item.component";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { ViewStoryComponent } from "../../../components/view-story/view-story.component";
import { StoryMenuComponent } from "../../../components/story-menu/story-menu.component";

@NgModule( {
               imports : [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   HomePageRoutingModule,
                   SignupPageComponentModule,
                   MatButtonModule,
                   MatRippleModule
               ],
               declarations : [ HomePage, ChatItemComponent, StoriesComponent, StoryItemComponent, ViewStoryComponent, StoryMenuComponent ]
           } )
export class HomePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StoriesComponent } from '../../components/stories/stories.component';
import { ChatsComponent } from '../../components/chats/chats.component';
import { StoryComponent } from '../../components/stories/story/story.component';
import { ChatComponent } from '../../components/chats/chat/chat.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule( {
               imports: [
                   CommonModule,
                   FormsModule,
                   IonicModule,
                   DashboardPageRoutingModule,
                   MatFormFieldModule,
                   MatIconModule,
               ],
               declarations: [ DashboardPage, StoriesComponent, ChatsComponent, StoryComponent, ChatComponent ],
           } )
export class DashboardPageModule {}

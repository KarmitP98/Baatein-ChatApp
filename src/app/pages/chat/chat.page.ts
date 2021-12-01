import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootState } from "../../store/root";
import { UserModel } from "../../models/UserModel";
import ChatModel from "../../models/ChatModel";
import { ChatService } from "../../services/chat.service";
import { firstValueFrom } from "rxjs";
import { startANewConversation } from "../../shared/functions";
import { Router } from "@angular/router";

@Component( {
                selector : "app-chat-page",
                templateUrl : "./chat.page.html",
                styleUrls : [ "./chat.page.scss" ]
            } )
export class ChatPage implements OnInit {
    
    currentUser : UserModel = undefined;
    otherUser : UserModel = undefined;
    chat : ChatModel = undefined;
    newChat : boolean = true;
    loading : boolean = true;
    
    constructor( private store : Store<RootState>, private chatService : ChatService, private router : Router ) { }
    
    async ngOnInit() {
        let userState = await firstValueFrom( this.store.select( "user" ) );
        this.currentUser = userState.user;
        let chatState = await firstValueFrom( this.store.select( "chat" ) );
        this.otherUser = chatState.with;
        if ( this.currentUser && this.otherUser ) {
            await this.chatService.fetchChatBetween( this.currentUser.uId, this.otherUser.uId ).get().then( snap => {
                if ( !snap.empty ) {
                    this.chat = snap.docs[0].data();
                    this.newChat = false;
                } else {
                    this.newChat = true;
                }
                this.chat = startANewConversation( this.currentUser, this.otherUser );
                this.loading = false;
            } );
        } else {
            await this.router.navigate( [ "/", "tabs", "contacts" ] );
        }
    }
    
}

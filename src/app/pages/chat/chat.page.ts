import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootState } from "../../store/root";
import { UserModel } from "../../models/UserModel";
import ChatModel from "../../models/ChatModel";
import { ChatService } from "../../services/chat.service";
import { Subscription } from "rxjs";
import { startANewConversation } from "../../shared/functions";
import { Router } from "@angular/router";

@Component( {
                selector : "app-chat-page",
                templateUrl : "./chat.page.html",
                styleUrls : [ "./chat.page.scss" ]
            } )
export class ChatPage implements OnInit, OnDestroy {
    
    currentUser : UserModel = undefined;
    otherUser : UserModel = undefined;
    chat : ChatModel = undefined;
    newChat : boolean = true;
    loading : boolean = true;
    storeSub : Subscription = new Subscription();
    
    constructor( private store : Store<RootState>, private chatService : ChatService, private router : Router ) { }
    
    ngOnInit() {
        this.store.subscribe( ( state : RootState ) => {
            if ( state ) {
                this.currentUser = state.user.user;
                this.otherUser = state.chat.with;
                
                if ( this.currentUser && this.otherUser ) {
                    this.chatService.fetchChatBetween( this.currentUser.uId, this.otherUser.uId ).get().then( snap => {
                        if ( !snap.empty ) {
                            this.chat = snap.docs[0].data();
                            this.newChat = false;
                        } else {
                            this.newChat = true;
                            this.chat = startANewConversation( this.currentUser, this.otherUser );
                        }
                        this.loading = false;
                    } );
                } else {
                    this.router.navigate( [ "/", "tabs", "contacts" ] );
                }
            }
        } );
        
        
    }
    
    ngOnDestroy() : void {
        if ( this.storeSub ) {
            this.storeSub.unsubscribe();
        }
    }
    
    
}

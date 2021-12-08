import { Component, OnDestroy, OnInit } from "@angular/core";
import { RootState } from "../../../store/root";
import { Store } from "@ngrx/store";
import { ChatService } from "../../../services/chat.service";
import { Subscription } from "rxjs";
import ChatModel from "../../../models/ChatModel";
import { UserModel } from "../../../models/UserModel";

@Component( {
                selector : "app-home",
                templateUrl : "./home.page.html",
                styleUrls : [ "./home.page.scss" ]
            } )
export class HomePage implements OnInit, OnDestroy {
    
    chatSub : Subscription;
    userSub : Subscription;
    chats : ChatModel[] = [];
    currentUser : UserModel;
    loading = true;
    
    constructor( private store : Store<RootState>, private chatService : ChatService ) { }
    
    ngOnInit() {
        // Fetch the value of current user from the store.
        this.userSub = this.store.select( "user" ).subscribe( user => {
            if ( user?.user ) {
                this.currentUser = user.user;
                // Fetch all the chats that have current user's uid in the betweenIds array
                this.chatService.fetchChatByAttribute( "betweenIds", "array-contains", this.currentUser.uId )
                    .onSnapshot( snap => {
                        if ( !snap.empty ) {
                            this.chats = snap.docs.map( doc => doc.data() );
                        }
                    } );
            }
            this.loading = false;
        } );
    }
    
    ngOnDestroy() : void {
        if ( this.chatSub ) {
            this.chatSub.unsubscribe();
        }
        if ( this.userSub ) {
            this.userSub.unsubscribe();
        }
    }
    
    
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootState } from "../../store/root";
import { UserModel } from "../../models/UserModel";
import ChatModel, { MessageModel, MessageStatus, MessageType } from "../../models/ChatModel";
import { ChatService } from "../../services/chat.service";
import { Subscription } from "rxjs";
import { startANewConversation } from "../../shared/functions";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/compat/firestore";

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
    text : string = "";
    
    constructor( private store : Store<RootState>, private chatService : ChatService, private router : Router, private afs : AngularFirestore ) { }
    
    ngOnInit() {
        // Fetch the Current User and Other user from state.
        this.store.subscribe( ( state : RootState ) => {
            if ( state ) {
                this.currentUser = state.user.user;
                this.otherUser = state.chat.with;
                // If both users exists, fetch the chat between these 2 users.
                if ( this.currentUser && this.otherUser ) {
                    this.chatService.fetchChatBetween( this.currentUser.uId, this.otherUser.uId ).onSnapshot( snap => {
                        if ( !snap.empty ) {
                            const withCurrent = snap.docs.filter( value => value.data().betweenIds.includes( this.otherUser.uId ) );
                            if ( withCurrent?.length ) {
                                this.chat = withCurrent[0]?.data();
                                this.newChat = false;
                            } else {
                                this.newChat = true;
                                this.chat = startANewConversation( this.currentUser, this.otherUser,
                                                                   this.afs.collection( "users" ).doc( this.currentUser.uId ).ref,
                                                                   this.afs.collection( "users" ).doc( this.otherUser.uId ).ref );
                            }
                        } else {
                            this.newChat = true;
                            this.chat = startANewConversation( this.currentUser, this.otherUser,
                                                               this.afs.collection( "users" ).doc( this.currentUser.uId ).ref,
                                                               this.afs.collection( "users" ).doc( this.otherUser.uId ).ref );
                        }
                        this.loading = false;
                    } );
                } else {
                    // If both users do not exist, navigate back to contacts page.
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
    
    handleSubmit = async () => {
        if ( this.text ) {
            if ( this.newChat ) {
                this.chat.cId = this.afs.createId();
            }
            
            const message : MessageModel = {
                text : this.text,
                cId : this.chat.cId,
                toId : this.otherUser.uId,
                fromId : this.currentUser.uId,
                from : this.afs.collection( "users" ).doc( this.currentUser.uId ).ref,
                to : this.afs.collection( "users" ).doc( this.otherUser.uId ).ref,
                createdAt : new Date(),
                status : MessageStatus.sent,
                time : new Date(),
                type : MessageType.text,
                lastUpdatedAt : new Date()
            };
            const clone = {
                ...this.chat,
                messages : this.chat.messages?.length ? [ ...this.chat.messages,
                                                          message ] : [ message ]
            };
            if ( this.newChat ) {
                await this.chatService.createNewChat( clone )
                          .then( () => {
                              this.text = "";
                              this.newChat = false;
                          } );
            } else {
                await this.chatService.updateChat( clone )
                          .then( () => {
                              this.text = "";
                          } );
            }
        }
    };
    
}

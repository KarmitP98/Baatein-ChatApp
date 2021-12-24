import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootState } from "../../store/root";
import { UserModel } from "../../models/UserModel";
import ChatModel, { MessageModel, MessageStatus, MessageType } from "../../models/ChatModel";
import { ChatService } from "../../services/chat.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { SetCurrentChatAction } from "../../store/chat/chat.actions";
import { startANewConversation } from "../../shared/functions";

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
    chatStoreSub : Subscription = new Subscription();
    
    constructor( private store : Store<RootState>, private chatService : ChatService, private router : Router, private afs : AngularFirestore ) { }
    
    ngOnInit() {
        this.loadChat();
    }
    
    ngOnDestroy() : any {
        if ( this.storeSub ) {
            this.storeSub.unsubscribe();
        }
        this.store.dispatch( new SetCurrentChatAction( undefined ) );
    }
    
    loadChat = () => {
        // Fetch the Current User and Other user from state.
        this.storeSub = this.store.subscribe( ( state : RootState ) => {
            if ( state ) {
                this.loading = true;
                this.currentUser = state.user.user;
                this.otherUser = state.chat.with;
                // If both users exists, fetch the chat between these 2 users.
                if ( this.currentUser && this.otherUser ) {
                    
                    const allChatsWithCurrentUser = state.chat.allChats?.filter(
                        chat => chat.betweenIds.includes( this.otherUser.uId ) && chat.betweenIds.includes( this.currentUser.uId ) );
                    
                    if ( allChatsWithCurrentUser?.length === 1 ) {
                        this.chat = allChatsWithCurrentUser[0];
                        this.updateMessageStatus();
                        this.newChat = false;
                    } else {
                        this.newChat = true;
                        this.chat = startANewConversation( this.currentUser, this.otherUser,
                                                           this.afs.collection( "users" ).doc( this.currentUser.uId ).ref,
                                                           this.afs.collection( "users" ).doc( this.otherUser.uId ).ref );
                    }
                    this.loading = false;
                } else {
                    // If both users do not exist, navigate back to contacts page.
                    this.router.navigate( [ ".." ] );
                }
            }
        } );
    };
    
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
                                                          message ] : [ message ],
                updatedAt : new Date()
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
    
    updateMessageStatus = () => {
        if ( this.chat.messages.some( value => value.fromId === this.otherUser.uId && value.status === MessageStatus.sent ) ) {
            const messages = this.chat.messages.map(
                value => {
                    if ( value.fromId === this.otherUser.uId && value.status === MessageStatus.sent ) {
                        value.status = MessageStatus.seen;
                        value.updatedAt = new Date();
                        value.lastUpdatedAt = new Date();
                    }
                    return value;
                } );
            this.chatService.updateChat( { ...this.chat, messages } );
        }
    };
    
}

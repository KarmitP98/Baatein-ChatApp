import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ChatModel, TextModel, UserModel } from "../../shared/models";
import * as firebase from "firebase";
import { DataService } from "../../services/data.service";
import { Subscription } from "rxjs";
import Timestamp = firebase.firestore.Timestamp;

@Component( {
                selector : "app-chat",
                templateUrl : "./chat.component.html",
                styleUrls : [ "./chat.component.scss" ]
            } )
export class ChatComponent implements OnInit, OnDestroy {
    
    @Input( "data" ) data : { user : UserModel, oUser : UserModel };
    text : string;
    messages : TextModel[] = [];
    user : UserModel;
    oUser : UserModel;
    chat : ChatModel;
    chatSub : Subscription;
    
    constructor( private ds : DataService ) {
        
    
    }
    
    ngOnInit() {
        this.user = this.data.user;
        this.oUser = this.data.oUser;
        this.chatSub = this.ds.fetchChatWith( this.user.uId, this.oUser.uId )
                           .subscribe( value => {
                               if ( value.length > 0 ) {
                                   this.chat = value[0];
                                   this.messages = this.chat.texts;
                               } else {
                                   this.chat = {
                                       chatId : "temp",
                                       texts : this.messages,
                                       status : "open",
                                       userIds : [ this.user.uId, this.oUser.uId ],
                                       users : [ this.user, this.oUser ]
                                   };
                               }
                           } );
    }
    
    ngOnDestroy() : void {
        this.chatSub.unsubscribe();
    }
    
    sendMessage() : void {
        if ( this.text.length > 0 ) {
            
            if ( this.messages.length === 0 ) {
                this.ds.addChat( this.chat );
            }
            
            const tempText : TextModel = {
                from : this.user.uId,
                to : this.oUser.uId,
                data : this.text,
                status : "sent",
                lastUpdateTime : Timestamp.now(),
                sentTime : Timestamp.now(),
                deleted : false
            };
            
            this.messages.push( tempText );
            this.chat.texts = this.messages;
            
            this.ds.updateChat( this.chat, this.chat.chatId );
            console.log( this.messages );
            this.text = "";
        }
    }
}

import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ChatModel, TextModel, UserModel } from "../../shared/models";
import * as firebase from "firebase";
import { DataService } from "../../services/data.service";
import { Subscription } from "rxjs";
import { IonContent, ModalController } from "@ionic/angular";
import { UserInfoComponent } from "../user/user-info/user-info.component";
import Timestamp = firebase.firestore.Timestamp;

@Component( {
                selector : "app-chat",
                templateUrl : "./chat.component.html",
                styleUrls : [ "./chat.component.scss" ]
            } )
export class ChatComponent implements OnInit, OnDestroy {
    
    @Input( "data" ) data : { user : UserModel, oUser : UserModel, chat? : ChatModel };
    @ViewChild( "content" ) ionContent : IonContent;
    text : string;
    messages : TextModel[] = [];
    user : UserModel;
    oUser : UserModel;
    chat : ChatModel;
    chatSub : Subscription;
    
    constructor( private ds : DataService,
                 private modalController : ModalController ) {
        
        
    }
    
    ngOnInit() {
        this.user = this.data.user;
        this.oUser = this.data.oUser;
        this.chatSub = this.ds.fetchChatWith( this.user.uId, this.oUser.uId )
                           .subscribe( value => {
                               if ( value?.length > 0 ) {
                                   this.chat = value[0];
                                   this.messages = this.chat.texts;
                                   setTimeout( () => {
                                       this.ionContent.scrollToBottom( 100 );
                                   }, 50 );
                                   this.updateChatStatus();
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
            this.updateChat();
    
            this.text = "";
        }
    }
    
    updateChat() {
        this.chat.texts = this.messages;
        this.ds.updateChat( this.chat, this.chat.chatId );
    }
    
    updateChatStatus() {
        this.messages.forEach( value => {
            if ( value.status === "sent" && value.from !== this.user.uId ) {
                value.status = "seen";
                value.lastUpdateTime = Timestamp.now();
            }
        } );
        this.updateChat();
    }
    
    async openUserDetails() {
        const modal = await this.modalController.create( {
                                                             component : UserInfoComponent,
                                                             componentProps : { user : this.oUser },
                                                             swipeToClose : true,
                                                             animated : true,
                                                             mode : "md",
                                                             showBackdrop : true
                                                         } );
        
        return modal.present();
    }
    
}

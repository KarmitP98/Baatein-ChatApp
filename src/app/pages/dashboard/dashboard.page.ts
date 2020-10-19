import { Component, OnDestroy, OnInit } from "@angular/core";
import { ChatModel, UserModel } from "../../shared/models";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../../services/data.service";
import { UntilDestroy } from "@ngneat/until-destroy";
import { MenuComponent } from "../../components/menu/menu.component";
import { ModalController, PopoverController } from "@ionic/angular";
import { pushTrigger } from "../../shared/animations";
import { Subscription } from "rxjs";
import { UsersListComponent } from "../../components/user/users-list/users-list.component";
import { textStatus } from "../../shared/constants";
import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

@UntilDestroy( { checkProperties : true } )

@Component( {
                selector : "app-dashboard",
                templateUrl : "./dashboard.page.html",
                styleUrls : [ "./dashboard.page.scss" ],
                animations : [ pushTrigger ]
            } )
export class DashboardPage implements OnInit, OnDestroy {
    
    userSub : Subscription;
    chatSub : Subscription;
    
    user : UserModel;
    isChatting = false;
    users : UserModel[] = [];
    selectedUser : UserModel;
    chats : ChatModel[] = [];
    selectedChat : ChatModel;
    TS = textStatus;
    
    constructor( private route : ActivatedRoute,
                 public ds : DataService,
                 private pc : PopoverController,
                 private mc : ModalController ) {
        
        const uid = this.route.snapshot.params["uId"];
        
        this.userSub = this.ds.fetchUser()
                           .subscribe( value => {
                               if ( value ) {
                                   console.log( "D:USUB" );
                                   this.user = value.filter( usr => usr.uId === uid )[0];
                                   if ( !this.user.onlineStatus || this.user.onlineStatus === "offline" ) {
                                       this.user.onlineStatus = "online";
                                       this.ds.updateUser( this.user );
                                   }
                                   this.users = value.filter( usr => usr.uId !== uid );
                               }
                           } );
        
        this.chatSub = this.ds.fetchChats( "userIds", "array-contains", uid )
                           .subscribe( value => {
                               if ( value?.length > 0 ) {
                                   this.chats = value;
                                   console.log( "D:CSUB" );
                               }
                           } );
        
    }
    
    ngOnInit() {
    }
    
    ngOnDestroy() : void {
        this.userSub.unsubscribe();
        this.chatSub.unsubscribe();
    }
    
    async openMenu( $event : MouseEvent ) {
        this.ngOnDestroy();
        const pop = await this.pc
                              .create( {
                                           component : MenuComponent,
                                           event : $event,
                                           animated : true,
                                           mode : "md",
                                           keyboardClose : true,
                                           backdropDismiss : true,
                                           componentProps : { uId : this.user.uId }
                                       } );
        await pop.present();
    }
    
    loadChatWith( oUser : UserModel, withChat? : ChatModel ) {
        if ( this.selectedUser === oUser ) {
            this.isChatting = !this.isChatting;
            this.selectedChat = null;
            this.selectedUser = null;
        } else {
            this.isChatting = false;
            this.selectedChat = null;
            
            setTimeout( value => {
                this.selectedUser = oUser;
                if ( withChat ) {
                    this.selectedChat = withChat;
                }
                this.isChatting = true;
                
            }, 100 );
        }
    }
    
    loadChat( chat : ChatModel ) : void {
        var oUser = this.getOtherUser( chat );
        this.loadChatWith( oUser, chat );
    }
    
    getOtherUser( chat : ChatModel ) : UserModel {
        return this.users.filter( usr => usr.uId === chat.userIds.filter( value => value !== this.user.uId )[0] )[0];
    }
    
    async openUsersList() {
        var temp : UserModel[] = [];
        
        for ( let i = 0; i < temp.length; i++ ) {
            if ( !this.hasChatsWith( temp[i].uId ) ) {
                temp.splice( i, 1 );
            }
        }
        
        const modal = await this.mc.create( {
                                                component : UsersListComponent,
                                                componentProps : { users : temp },
                                                mode : "md",
                                                swipeToClose : true,
                                                showBackdrop : false,
                                                animated : true,
                                                backdropDismiss : false
                                            } );
        await modal.present();
        
        const { data } = await modal.onWillDismiss();
        if ( data?.user ) {
            this.loadChatWith( data.user );
        }
    }
    
    public getChatUnreadMessages( chat : ChatModel ) : number {
        var sum = 0;
        chat.texts.forEach( value => value.status !== this.TS.seen && value.from !== this.user.uId ? sum++ : "" );
        return sum;
    }
    
    public isUserOnline( chat : ChatModel ) : boolean {
        return this.getOtherUser( chat )[0].onlineStatus === "online";
    }
    
    private hasChatsWith( oUserId : string ) : boolean {
        return this.chats.some( value => value.userIds.some( value1 => value1 === oUserId ) );
    }
    
    private updateChatTextStatus() {
        this.chats.forEach( chat => {
            chat.texts.forEach( text => {
                if ( text.status === "sent" && text.from !== this.user.uId ) {
                    text.status = this.TS.received;
                    text.lastUpdateTime = Timestamp.now();
                }
            } );
            this.updateChat( chat );
        } );
    }
    
    private updateUserInChat() {
        this.chats.forEach( chat => {
            chat.users.forEach( user => {
                if ( user.uId === this.user.uId ) {
                    user = this.user;
                } else {
                    user = this.getOtherUser( chat );
                }
            } );
            this.updateChat( chat );
        } );
    }
    
    private updateChat( chat : ChatModel ) {
        this.ds.updateChat( chat, chat.chatId );
    }
    
}

import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { UserModel } from "../../models/UserModel";
import ChatModel, { MessageModel, MessageStatus } from "../../models/ChatModel";
import { Subscription } from "rxjs";
import { UserService } from "../../services/user.service";
import { getStatusIcon, TimeStampToDate } from "../../shared/functions";
import { StartChatAction } from "../../store/chat/chat.actions";
import { Store } from "@ngrx/store";
import { RootState } from "../../store/root";
import { Router } from "@angular/router";

@Component( {
                selector : "app-chat-item",
                templateUrl : "./chat-item.component.html",
                styleUrls : [ "./chat-item.component.scss" ]
            } )
export class ChatItemComponent implements OnInit, OnDestroy {
    
    @Input() currentUser : UserModel;
    @Input() chat : ChatModel;
    user : UserModel;
    message : MessageModel;
    userSub : Subscription;
    loading = true;
    chatSub : Subscription = new Subscription( undefined );
    
    constructor( private userService : UserService, private store : Store<RootState>, private router : Router ) { }
    
    async ngOnInit() {
        if ( this.chat ) {
            const otherUserId = this.chat?.betweenIds?.filter( value => value !== this.currentUser?.uId )[0];
            const docs = await this.userService.fetchUserByUId( otherUserId ).get();
            if ( !docs.empty ) {
                this.user = await docs.docs[0].data();
            }
            this.loading = false;
        }
    }
    
    ngOnDestroy() : void {
        if ( this.userSub ) {
            this.userSub.unsubscribe();
        }
        if ( this.chatSub ) {
            this.chatSub.unsubscribe();
        }
    }
    
    /**
     * Get the last message in the chat
     */
    getLastMessage() : MessageModel {
        return this.chat?.messages?.slice().pop();
    }
    
    /**
     * Get Image Alt for user profile Picture
     */
    getAltImageName() : string {
        return this.user?.profilePic?.toString() || "Default Profile Picture";
    }
    
    /**
     * Get User Avatar
     */
    getUserAvatar() : string {
        return this.user?.profilePic || "assets/Avatars/user-default.jpg";
    }
    
    /**
     * Get unread message length
     */
    getUnreadMessages() : number {
        return this.chat?.messages.filter(
            ( message : MessageModel ) => message?.toId === this.currentUser?.uId && message?.status === MessageStatus?.sent ).length;
    }
    
    /**
     * Get Date
     * @param stamp
     */
    getDate( stamp ) {
        return TimeStampToDate( stamp );
    }
    
    /**
     * Limit Text to specified length.
     * @param text
     * @param number
     */
    limitTo( text : string, number : number ) : any {
        const fullLength = text.length;
        if ( fullLength > number ) {
            return text.slice( 0, number ).concat( "..." );
        }
        return text;
    }
    
    /**
     * Get Status Icon for the status
     * @param status
     */
    getStatusIcon( status ) : any {
        return getStatusIcon( status );
    }
    
    /**
     * Start and new chat with other user
     */
    startChatWith = () => {
        this.store.dispatch( new StartChatAction( { with : { ...this.user } } ) );
        // this.chatSub = this.store.select( "chat" ).subscribe( async value => {
        //     if ( value?.allChats ) {
        //         const allChatsWithCurrentUser = value.allChats?.filter(
        //             chat => chat.betweenIds.includes( this.user.uId ) && chat.betweenIds.includes( this.currentUser.uId ) );
        //         if ( allChatsWithCurrentUser?.length === 1 ) {
        //             await this.store.dispatch( new SetCurrentChatAction( allChatsWithCurrentUser[0] ) );
        //         } else {
        //             await this.store.dispatch( new SetCurrentChatAction( undefined ) );
        //         }
        //     }
        //     console.log('Navigate');
        //     await this.router.navigate( [ "/", "chat" ] );
        // } );
        this.router.navigate( [ "/", "chat" ] );
    };
}

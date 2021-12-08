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
    }
    
    getLastMessage() : MessageModel {
        return this.chat?.messages?.slice().pop();
    }
    
    getAltImageName() : string {
        return this.user?.profilePic?.toString() || "Default Profile Picture";
    }
    
    getUserAvatar() : string {
        return this.user?.profilePic || "assets/Avatars/user-default.jpg";
    }
    
    getUnreadMessages() : number {
        return this.chat?.messages.filter(
            ( message : MessageModel ) => message?.toId === this.currentUser?.uId && message?.status === MessageStatus?.sent ).length;
    }
    
    getDate( stamp ) {
        return TimeStampToDate( stamp );
    }
    
    limitTo( text : string, number : number ) : any {
        const fullLength = text.length;
        if ( fullLength > number ) {
            return text.slice( 0, number ).concat( "..." );
        }
        return text;
    }
    
    getStatusIcon( status ) : any {
        return getStatusIcon( status );
    }
    
    startChatWith = async () => {
        await this.store.dispatch( new StartChatAction( { with : { ...this.user } } ) );
        await this.router.navigate( [ "/", "chat" ] );
    };
}

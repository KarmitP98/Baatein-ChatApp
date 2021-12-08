import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { UserModel } from "../../models/UserModel";
import ChatModel, { MessageModel, MessageStatus } from "../../models/ChatModel";
import { Subscription } from "rxjs";
import { UserService } from "../../services/user.service";
import { TimeStampToDate } from "../../shared/functions";

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
    
    constructor( private userService : UserService ) { }
    
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
        this.userSub.unsubscribe();
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
}

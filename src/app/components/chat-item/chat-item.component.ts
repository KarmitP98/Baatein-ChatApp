import { AfterViewInit, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { UserModel } from "../../models/UserModel";
import ChatModel, { MessageModel, MessageStatus } from "../../models/ChatModel";
import { Subscription } from "rxjs";

@Component( {
                selector : "app-chat-item",
                templateUrl : "./chat-item.component.html",
                styleUrls : [ "./chat-item.component.scss" ]
            } )
export class ChatItemComponent implements OnInit, AfterViewInit, OnDestroy {
    
    @Input() currentUser : UserModel;
    @Input() chat : ChatModel;
    user : UserModel;
    message : MessageModel;
    userSub : Subscription;
    loading = true;
    
    constructor() { }
    
    ngOnInit() {}
    
    async ngAfterViewInit() {
        const otherUserId = this.chat?.betweenIds?.filter( value => value !== this.currentUser?.uId )[0];
        this.userSub = await this.chat?.between[otherUserId].get().then( value => {
            this.loading = true;
            if ( value.exists ) {
                this.user = value.data();
            }
            this.loading = false;
        } );
    }
    
    ngOnDestroy() : void {
        this.userSub.unsubscribe();
    }
    
    getLastMessage() : MessageModel {
        return this.chat?.messages?.slice().pop();
    }
    
    getAltImageName() : string {
        return this.user?.profilePic.toString() || "Default Profile Picture";
    }
    
    getUserAvatar() : string {
        return this.user?.profilePic || "assets/Avatars/user-default.jpg";
    }
    
    getUnreadMessages() : number {
        return this.chat?.messages.filter(
            ( message : MessageModel ) => message.toId === this.currentUser.uId && message.status === MessageStatus.sent ).length;
    }
}

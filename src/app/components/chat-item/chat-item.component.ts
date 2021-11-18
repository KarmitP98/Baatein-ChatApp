import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { UserModel } from "../../models/UserModel";
import ChatModel, { MessageModel } from "../../models/ChatModel";

@Component( {
                selector : "app-chat-item",
                templateUrl : "./chat-item.component.html",
                styleUrls : [ "./chat-item.component.scss" ]
            } )
export class ChatItemComponent implements OnInit, AfterViewInit {
    
    @Input() currentUser : UserModel;
    @Input() chat : ChatModel;
    user : UserModel;
    message : MessageModel;
    
    constructor() { }
    
    ngOnInit() {}
    
    ngAfterViewInit() : void {
    }
    
    getAltImageName() : string {
        return "";
    }
    
    getUserAvatar() : string {
        return "";
    }
    
    getUnreadMessages() : number {
        return 0;
    }
}

import { Component, Input, OnInit } from "@angular/core";
import { MessageModel } from "../../models/ChatModel";
import { UserModel } from "../../models/UserModel";
import { getStatusIcon } from "../../shared/functions";

@Component( {
                selector : "app-message",
                templateUrl : "./message.component.html",
                styleUrls : [ "./message.component.scss" ]
            } )
export class MessageComponent implements OnInit {
    
    @Input() message : MessageModel;
    @Input() user : UserModel;
    @Input() current : boolean = false;
    @Input( "pos" ) messagePosition : string = "last";
    
    constructor() { }
    
    ngOnInit() {
    }
    
    /**
     * Get status icon of the message status
     */
    getStatusIcon = () => {
        return getStatusIcon( this.message.status );
    };
    
    isLastMessage() : boolean {
        return this.messagePosition === "last";
    }
}

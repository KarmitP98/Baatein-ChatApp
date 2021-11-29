import { Component, Input, OnInit } from "@angular/core";
import { MessageModel } from "../../models/ChatModel";
import { UserModel } from "../../models/UserModel";

@Component( {
                selector : "app-message",
                templateUrl : "./message.component.html",
                styleUrls : [ "./message.component.scss" ]
            } )
export class MessageComponent implements OnInit {
    
    @Input() message : MessageModel;
    @Input() user : UserModel;
    @Input() current: boolean = false;
    
    constructor() { }
    
    ngOnInit() {}
    
}

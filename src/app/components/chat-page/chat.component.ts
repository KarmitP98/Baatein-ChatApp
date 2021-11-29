import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import ChatModel from "../../models/ChatModel";
import { ChatService } from "../../services/chat.service";

@Component( {
                selector : "app-chat",
                templateUrl : "./chat.component.html",
                styleUrls : [ "./chat.component.scss" ]
            } )
export class ChatComponent implements OnInit, AfterViewInit {
    
    @Input() chat : ChatModel;
    loading = true;
    currentText : string = "";
    
    
    constructor( private chatService : ChatService ) { }
    
    ngOnInit() {}
    
    ngAfterViewInit() {
        if ( this.chat ) {
            this.loading = false;
        }
    }
    
    sendText() {
    
    }
    
}

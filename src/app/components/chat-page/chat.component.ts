import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import ChatModel from "../../models/ChatModel";
import { UserModel } from "../../models/UserModel";
import { Store } from "@ngrx/store";
import { RootState } from "../../store/root";

@Component( {
                selector : "app-chat",
                templateUrl : "./chat.component.html",
                styleUrls : [ "./chat.component.scss" ]
            } )
export class ChatComponent implements OnInit, AfterViewInit {
    
    @Input() chat : ChatModel;
    @Input( "current" ) currentUser : UserModel = undefined;
    @Input( "other" ) otherUser : UserModel = undefined;
    loading = true;
    currentText : string = "";
    typing : boolean = false;
    
    
    constructor( private store : Store<RootState> ) { }
    
    ngOnInit() {}
    
    ngAfterViewInit() {
        if ( this.chat ) {
            this.loading = false;
        }
    }
    
    isChatEmpty = () => {
        return this.chat?.messages?.length <= 0;
    };
    
    getMessages = () => {
        return this.chat?.messages.slice().map( message => message.text );
    };
}

import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import ChatModel, { MessageModel } from "../../models/ChatModel";
import { UserModel } from "../../models/UserModel";
import { Store } from "@ngrx/store";
import { RootState } from "../../store/root";

@Component( {
                selector : "app-chat",
                templateUrl : "./chat.component.html",
                styleUrls : [ "./chat.component.scss" ]
            } )
export class ChatComponent implements OnInit, AfterViewInit, OnChanges {
    
    @Input() chat : ChatModel;
    @Input( "current" ) currentUser : UserModel = undefined;
    @Input( "other" ) otherUser : UserModel = undefined;
    loading = true;
    currentText : string = "";
    typing : boolean = false;
    
    
    constructor( private store : Store<RootState> ) { }
    
    ngOnInit() {
        if ( this.chat ) {
            this.loading = false;
        }
    }
    
    ngAfterViewInit() {
    }
    
    ngOnChanges( changes : SimpleChanges ) : void {
        // Check if the change is initial page load change or a change in Chat Messages
        if ( changes.chat.isFirstChange() || changes.chat.currentValue.messages.length !== changes.chat.previousValue.messages.length ) {
            setTimeout( () => {this.scrollToBottom();}, 200 );
        }
    }
    
    /**
     * Check if chat is empty
     */
    isChatEmpty = () => {
        return this.chat?.messages?.length <= 0;
    };
    
    /**
     * Get all the messages in the chat
     */
    getMessages() : MessageModel[] {
        return this.chat?.messages.slice().map( message => message );
    };
    
    /**
     * Get user object that matches user id
     * @param fromId
     */
    getUser( fromId : string ) : any {
        if ( fromId ) {
            return [ this.currentUser, this.otherUser ].slice().filter( user => user.uId === fromId )[0];
        }
        return undefined;
    }
    
    /**
     * Scroll to bottom
     */
    scrollToBottom = () => {
        const bottom = document.getElementById( "bottom" );
        bottom?.scrollIntoView( { behavior : "smooth" } );
    };
    
    getMessagePosition( message : MessageModel, i : number, c : number ) : any {
        const senderIds = this.chat.messages?.map( message => message.fromId );
        if ( senderIds[i] === senderIds[i - 1] && senderIds[i] === senderIds[i + 1] ) {
            return "middle";
        } else if ( senderIds[i] !== senderIds[i - 1] && senderIds[i] === senderIds[i + 1] ) {
            return "first";
        } else if ( senderIds[i] === senderIds[i - 1] && senderIds[i] !== senderIds[i + 1] ) {
            return "moreLast";
        } else {
            return "last";
        }
    }
}

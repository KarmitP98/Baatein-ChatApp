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
        if ( changes.chat.isFirstChange() || changes.chat.currentValue.messages.length !== changes.chat.previousValue.messages.length ) {
            setTimeout( () => {this.scrollToBottom();}, 200 );
        }
    }
    
    
    isChatEmpty = () => {
        return this.chat?.messages?.length <= 0;
    };
    
    getMessages() : MessageModel[] {
        return this.chat?.messages.slice().map( message => message );
    };
    
    getUser( fromId : string ) : any {
        if ( fromId ) {
            return [ this.currentUser, this.otherUser ].slice().filter( user => user.uId === fromId )[0];
        }
        return undefined;
    }
    
    scrollToBottom = () => {
        const bottom = document.getElementById( "bottom" );
        bottom?.scrollIntoView( { behavior : "smooth" } );
    };
}

import { Component, Input, OnInit } from "@angular/core";
import { UserModel } from "../../models/UserModel";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { RootState } from "../../store/root";
import { StartChatAction } from "../../store/chat/chat.actions";

@Component( {
                selector : "app-contact-icon",
                templateUrl : "./contact-icon.component.html",
                styleUrls : [ "./contact-icon.component.scss" ]
            } )
export class ContactIconComponent implements OnInit {
    
    @Input() contact : UserModel;
    loading = true;
    
    constructor( private router : Router, private store : Store<RootState> ) { }
    
    ngOnInit() {
        this.loading = !this.contact;
    }
    
    /**
     * Start a new chat with the contact
     */
    startChatWith = async () => {
        await this.store.dispatch( new StartChatAction( { with : { ...this.contact } } ) );
        await this.router.navigate( [ "/", "chat" ] );
    };
    
    
}

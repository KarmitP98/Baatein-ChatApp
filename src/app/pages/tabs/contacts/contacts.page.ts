import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserModel } from "../../../models/UserModel";
import { Subscription } from "rxjs";
import { UserService } from "../../../services/user.service";
import { includes } from "../../../shared/constants";

@Component( {
                selector : "app-contacts",
                templateUrl : "./contacts.page.html",
                styleUrls : [ "./contacts.page.scss" ]
            } )
export class ContactsPage implements OnInit, OnDestroy {
    contacts : UserModel[] = [];
    userSub : Subscription = new Subscription();
    contantName : string;
    
    constructor( private userService : UserService ) { }
    
    ngOnInit() {
        this.userSub = this.userService.fetchAllUsers().valueChanges().subscribe( value => {
            if ( value?.length ) {
                this.contacts = value;
            }
        } );
    }
    
    ngOnDestroy() : void {
        this.userSub.unsubscribe();
    }
    
    
    filteredContacts() : UserModel[] {
        const contactName = this.contantName || "";
        return this.contacts.slice().filter(
            contact => includes( contact.name, contactName ) || includes( contact.email, contactName ) );
        
    }
}

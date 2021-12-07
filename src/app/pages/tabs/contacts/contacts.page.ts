import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserModel } from "../../../models/UserModel";
import { UserService } from "../../../services/user.service";
import { includes } from "../../../shared/constants";
import { Store } from "@ngrx/store";
import { RootState } from "../../../store/root";

@Component( {
                selector : "app-contacts",
                templateUrl : "./contacts.page.html",
                styleUrls : [ "./contacts.page.scss" ]
            } )
export class ContactsPage implements OnInit, OnDestroy {
    
    contacts : UserModel[] = [];
    contactName : string;
    currentUserId : string = undefined;
    sub;
    
    constructor( private userService : UserService, private store : Store<RootState> ) { }
    
    async ngOnInit() {
        // Get current user id
        this.sub = this.store.select( "user" ).subscribe( data => {
            if ( data?.user ) {
                this.currentUserId = data?.user?.uId;
                // Load all the user
                this.userService.fetchUserByAttribute( "uId", "!=", this.currentUserId ).get().then( value => {
                    if ( !value?.empty ) {
                        this.contacts = value.docs.map( doc => doc.data() );
                    }
                } );
            }
        } );
    }
    
    ngOnDestroy() : void {
        this.sub.unsubscribe();
    }
    
    
    filteredContacts() : UserModel[] {
        const contactName = this.contactName || "";
        return this.contacts.slice().filter(
            contact => includes( contact.name, contactName ) || includes( contact.email, contactName ) );
        
    }
}

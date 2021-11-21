import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserModel } from "../../../models/UserModel";
import { Subscription } from "rxjs";
import firebase from "firebase/compat";
import { UserService } from "../../../services/user.service";
import { user } from "@angular/fire/auth";

@Component( {
                selector : "app-contacts",
                templateUrl : "./contacts.page.html",
                styleUrls : [ "./contacts.page.scss" ]
            } )
export class ContactsPage implements OnInit, OnDestroy {
    contacts : UserModel[] = [];
    userSub : Subscription = new Subscription();
    
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
    
    
}

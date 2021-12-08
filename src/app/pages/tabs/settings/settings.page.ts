import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Store } from "@ngrx/store";
import { RootState } from "../../../store/root";
import { UserModel } from "../../../models/UserModel";
import { Subscription } from "rxjs";
import { UserService } from "../../../services/user.service";

@Component( {
                selector : "app-settings",
                templateUrl : "./settings.page.html",
                styleUrls : [ "./settings.page.scss" ]
            } )
export class SettingsPage implements OnInit, OnDestroy {
    
    currentUser : UserModel = undefined;
    userSub : Subscription;
    loading = true;
    
    constructor( private authService : AuthService, private store : Store<RootState>, private userService : UserService ) { }
    
    ngOnInit() {
        this.userSub = this.store.select( "user" ).subscribe( value => {
            if ( value?.user ) {
                this.currentUser = { ...value.user };
            }
            this.loading = false;
        } );
    }
    
    ngOnDestroy() : void {
        if ( this.userSub ) {
            this.userSub.unsubscribe();
        }
    }
    
    
    async logout() {
        await this.authService.logOut();
    }
    
    updateUser = async () => {
        await this.userService.updateUser( this.currentUser );
    };
}

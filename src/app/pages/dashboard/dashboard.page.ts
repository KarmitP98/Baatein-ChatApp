import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/model';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component( {
                selector: 'app-dashboard',
                templateUrl: './dashboard.page.html',
                styleUrls: [ './dashboard.page.scss' ],
            } )
export class DashboardPage implements OnInit, OnDestroy {
    
    currentUser: UserModel;
    userSub: Subscription;
    
    constructor( public as: AuthService, public us: UserService ) { }
    
    ngOnInit() {
        this.userSub = this.us
                           .fetchUsers( 'id', '==', JSON.parse( localStorage.getItem( 'UID' ) ) )
                           .valueChanges()
                           .subscribe( user => this.currentUser = user ? user[0] : undefined );
    }
    
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
    
    
}

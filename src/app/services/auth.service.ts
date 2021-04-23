/* tslint:disable */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserModel } from '../models/model';
import { UserService } from './user.service';

@Injectable( {
                 providedIn: 'root',
             } )
export class AuthService {
    
    constructor( private afa: AngularFireAuth,
                 private userService: UserService,
                 private router: Router ) { }
    
    /**
     * Login with email and password
     * @param email
     * @param password
     */
    public login( email: string, password: string ): void {
        
        // section Login
        
        this.afa.currentUser
            .then( user => {
                if (user) {
                    this.afa.signOut()
                        .then( res => console.log( 'User has been logged out!' ) );
                }
            } );
        
        this.afa.signInWithEmailAndPassword( email, password )
            .then( res => {
                if (res) {
                    this.userService.getCurrentUser( 'id', '==', res.user.uid )
                        .then( value => {
                            console.log( value );
                        } );
                }
            } )
            .catch( error => {
                console.log( error.message );
            } );
    }
    
    /**
     * Create a new user using email and password
     * @param user
     */
    public signUp( user: UserModel ): void {
        // section Signup
        this.afa.createUserWithEmailAndPassword( user.email, user.password )
            .then( res => {
                if (res) {
                    user.id = res.user.uid;
                    this.userService.createUser( user )
                        .then( () => this.navigateIn( user ) );
                }
            } );
    }
    
    /**
     * Logout and navigate to login
     */
    public signOut() {
        // section SignOut
        this.afa.signOut()
            .then( res => this.navigateOut() )
            .catch( err => console.log( err.message ) );
    }
    
    /**
     * Navigate to dashboard
     * @param user
     * @private
     */
    private navigateIn( user ): void {
        // section NavgiateIn
        localStorage.setItem( 'user', JSON.stringify( user ) );
        this.router.navigate( [ '/snazzy' ] )
            .then( res => console.log( 'User has been logged in!' ) );
    }
    
    /**
     * Navigate to login
     * @private
     */
    private navigateOut(): void {
        // section NavigateOut
        localStorage.removeItem( 'user' );
        console.log( 'User has been logged out!' );
        this.router.navigate( [ '' ] );
    }
    
}

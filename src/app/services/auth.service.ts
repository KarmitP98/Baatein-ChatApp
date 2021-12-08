import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import { BehaviorSubject } from "rxjs";
import { UserModel } from "../models/UserModel";
import { UserService } from "./user.service";
import { HOME_PAGE_URL } from "../shared/constants";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { RootState } from "../store/root";
import { setUserAction } from "../store/user/user.actions";
import { SetAuthAction } from "../store/auth/auth.actions";
import UserCredential = firebase.auth.UserCredential;

@Injectable( {
                 providedIn : "root"
             } )
export class AuthService {
    
    currentAuthUser : BehaviorSubject<UserCredential> = new BehaviorSubject<firebase.auth.UserCredential>( undefined );
    
    constructor( private afa : AngularFireAuth, private us : UserService, private router : Router, private store : Store<RootState> ) { }
    
    signUpWithEmailAndPassword = async ( user : UserModel ) => {
        return new Promise( async ( resolve, reject ) => {
            await this.afa
                      .createUserWithEmailAndPassword( user.email, user.password )
                      .then( ( value ) => {
                          if ( value ) {
                              this.currentAuthUser.next( value );
                              resolve( value );
                              this.us.createNewUser( { ...user, uId : value.user.uid }, value.user.uid, HOME_PAGE_URL );
                          }
                      } )
                      .catch( error => {
                          this.currentAuthUser.next( undefined );
                          reject( error );
                      } );
        } );
    };
    
    loginWithEmailAndPassword = async ( email : string, password : string ) => {
        return new Promise( async ( resolve, reject ) => {
            await this.afa.signInWithEmailAndPassword( email, password )
                      .then( ( user ) => {
                          if ( user ) {
                              this.currentAuthUser.next( user );
                              resolve( user );
                              this.router.navigate( HOME_PAGE_URL );
                          }
                      } )
                      .catch( error => {
                          this.currentAuthUser.next( undefined );
                          reject( error );
                      } );
        } );
    };
    
    logOut = async () => {
        return new Promise( async ( resolve, reject ) => {
            await this.afa.signOut()
                      .then( () => {
                          resolve( this.router.navigate( [ "/" ] ) );
                          this.store.dispatch( new setUserAction( undefined ) );
                          this.store.dispatch( new SetAuthAction( undefined ) );
                      } )
                      .catch( error => {
                          reject( error );
                      } );
        } );
    };
    
}

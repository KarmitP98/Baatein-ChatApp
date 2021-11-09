import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import { BehaviorSubject } from "rxjs";
import { UserModel } from "../models/UserModel";
import UserCredential = firebase.auth.UserCredential;

@Injectable( {
                 providedIn : "root"
             } )
export class AuthService {
    
    private currentAuthUser : BehaviorSubject<UserCredential>;
    
    constructor( private afa : AngularFireAuth ) { }
    
    signUpWithEmailAndPassword = async ( user : UserModel ) => {
        return new Promise( async ( resolve, reject ) => {
            await this.afa
                      .createUserWithEmailAndPassword( user.email, user.password )
                      .then( ( user ) => {
                          if ( user ) {
                              this.currentAuthUser.next( user );
                              resolve( user );
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
                          resolve( true );
                      } )
                      .catch( error => {
                          reject( error );
                      } );
        } );
    };
    
}

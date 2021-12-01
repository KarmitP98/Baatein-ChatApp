import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { UserModel } from "../models/UserModel";
import { Router } from "@angular/router";
import { addToLocal } from "../shared/functions";
import { UID } from "../shared/constants";
import firebase from "firebase/compat";
import { BehaviorSubject } from "rxjs";
import WhereFilterOp = firebase.firestore.WhereFilterOp;

@Injectable( {
                 providedIn : "root"
             } )
export class UserService {
    
    userCollection : AngularFirestoreCollection<UserModel> = this.afs.collection<UserModel>( "users" );
    emailCollection : AngularFirestoreCollection<{ email : string }> = this.afs.collection<{ email : string }>( "emails" );
    currentUser : BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>( undefined );
    
    constructor( private afs : AngularFirestore, private router : Router ) { }
    
    /**
     * Create a new user on signup and navigate to dashboard
     * @param user
     * @param userId
     * @param successRedirectURL
     */
    createNewUser = async ( user : UserModel, userId : string, successRedirectURL : string[] ) => {
        await this.userCollection.doc( userId ).set( { ...user } )
                  .then( async () => {
                      await this.addNewUserEmail( user.email );
                      await addToLocal( UID, userId );
                      await this.router.navigate( successRedirectURL );
                      this.currentUser.next( user );
                  } )
                  .catch( ( error ) => {
                      console.error( error );
                  } );
    };
    
    /**
     * Fetch all the users in the collection.
     */
    fetchAllUsers = () => {
        return this.userCollection;
    };
    
    /**
     * Fetch user that matches uId
     * @param uId
     */
    fetchUserByUId = ( uId : string ) => {
        return this.fetchUserByAttribute( "uId", "==", uId );
    };
    
    /**
     * Fetch users that have values matching the attributes.
     * @param attribute
     * @param condition
     * @param value
     */
    fetchUserByAttribute = ( attribute : string | firebase.firestore.FieldPath, condition : WhereFilterOp, value : any ) => {
        if ( attribute && value && condition ) {
            return this.userCollection.ref.where( attribute, condition, value );
        }
        return undefined;
    };
    
    /**
     * Update the user the user provided.
     * @param user
     */
    updateUser = async ( user : UserModel ) => {
        return new Promise( async ( resolve, reject ) => {
            await this.userCollection.doc( user.uId ).update( { ...user } )
                      .then( () => {
                          resolve( true );
                          this.currentUser.next( user );
                      } )
                      .catch( ( error ) => {
                          reject( error );
                      } );
        } );
    };
    
    /**
     * Delete the user.
     * @param user
     */
    deleteUser = async ( user : UserModel | string ) => {
        return new Promise( async ( resolve, reject ) => {
            const uId = typeof user === "string" ? user : user.uId;
            await this.userCollection.doc( uId ).delete()
                      .then( () => {
                          resolve( true );
                          this.currentUser.next( undefined );
                      } )
                      .catch( ( error ) => {
                          reject( error );
                      } );
        } );
    };
    
    /**
     * Add a new User email to the system
     * @param email
     */
    addNewUserEmail = async ( email : string ) => {
        await this.emailCollection.doc( email ).set( { email } );
    };
    
    /**
     * Check if the user email already exists in the system during signup
     * @param email
     */
    checkIfUserEmailExists = async ( email : string ) => {
        const user = await this.emailCollection.doc( email ).get().toPromise();
        return user.exists;
    };
    
}

import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { UserModel } from "../models/UserModel";
import { Router } from "@angular/router";
import { addToLocal } from "../shared/functions";
import { UID } from "../shared/constants";
import firebase from "firebase/compat";

@Injectable( {
                 providedIn : "root"
             } )
export class UserService {
    
    userCollection : AngularFirestoreCollection<UserModel> = this.afs.collection<UserModel>( "users" );
    
    constructor( private afs : AngularFirestore, private router : Router ) { }
    
    /**
     * Create a new user on signup and navigate to dashboard
     * @param user
     * @param userId
     */
    createNewUser = async ( user : UserModel, userId ) => {
        await this.userCollection.doc( userId ).set( { ...user } )
                  .then( () => {
                      addToLocal( UID, userId );
                      this.router.navigate( [ "/", "dashboard" ] );
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
        return this.fetchUserByAttribute( "uId", uId );
    };
    
    /**
     * Fetch users that have values matching the attributes.
     * @param attribute
     * @param value
     */
    fetchUserByAttribute = ( attribute : string | firebase.firestore.FieldPath, value : any ) => {
        if ( attribute && value ) {
            return this.userCollection.ref.where( attribute, "==", value );
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
                      } )
                      .catch( ( error ) => {
                          reject( error );
                      } );
        } );
    };
    
    
}

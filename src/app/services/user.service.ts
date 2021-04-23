/* tslint:disable */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserModel } from '../models/model';
import { Observable } from 'rxjs';
import firebase from 'firebase';

@Injectable( {
                 providedIn: 'root',
             } )
export class UserService {
    
    constructor( private afs: AngularFirestore ) { }
    
    /**
     * Create new user in database
     * @param user
     */
    public createUser( user: UserModel ): Promise<any> {
        // section CreateUser
        return this.afs.collection( 'users' )
                   .doc( user.id )
                   .set( user );
    }
    
    /**
     * Get the current user
     * @param attribute
     * @param condition
     * @param value
     */
    public getCurrentUser( attribute, condition, value ): Observable<any> {
        // section getCurrentUser
        return this.afs.collection<UserModel>( 'users', ref => ref.where( 'email', '==', 'a@b.com' ) ).valueChanges();
    }
    
    /**
     * Search for users that have attributes matching the value
     * @param attribute
     * @param condition
     * @param value
     */
    public fetchUsers( attribute?: string | firebase.firestore.FieldPath, condition?: '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in', value?: any ) {
        // section FetchUsers
        if (attribute) {
            return this.afs.collection<UserModel>( 'users', ref => ref.where( attribute, condition, value ) );
        }
        return this.afs.collection<UserModel>( 'users' );
    }
    
    /**
     * Delete user
     * @param user
     */
    public deleteUser( user: UserModel ): Promise<any> {
        // section DeleteUser
        return this.afs.collection<UserModel>( 'users' )
                   .doc( user.id )
                   .delete();
    }
    
    /**
     * Update user
     * @param user
     */
    public updateUser( user: UserModel ): Promise<any> {
        // section UpdateUser
        return this.afs.collection<UserModel>( 'users' )
                   .doc( user.id )
                   .update( user );
    }
    
}

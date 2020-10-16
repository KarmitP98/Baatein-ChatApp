import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { ChatModel, UserModel } from "../shared/models";
import * as firebase from "firebase";

@Injectable( {
                 providedIn: "root"
             } )
export class DataService {

    loadingSubject = new BehaviorSubject<boolean>( false );

    constructor(
        private afs: AngularFirestore,
        private tc: ToastController,
        private afa: AngularFireAuth,
        private router: Router
    ) { }

    public signUpWithEmail( user: UserModel, password: string ) {

        this.afa.createUserWithEmailAndPassword( user.uEmail, password )
            .then( value => {
                user.uId = value.user.uid;
                this.addUser( user );
            } )
            .catch( reason => {
                this.showToast( "User cannot be created!", 4000, "danger" );
            } );
    }

    public loginWithEmail( email: string, password: string ) {
        this.afa.signInWithEmailAndPassword( email, password )
            .then( value => {
                this.router.navigate( [ "/", value.user.uid ] );
            } )
            .catch( reason => {
                this.showToast( reason.message, 4000, "danger" );
            } );
    }

    public loginOAuth( provider: string ) {
        var pro: any;
        switch ( provider ) {
            case "google":
                // @ts-ignore
                pro = new firebase.auth.GoogleAuthProvider();
                break;
            case "github":
                // @ts-ignore
                pro = new firebase.auth.GithubAuthProvider();
                break;
            case "facebook":
                // @ts-ignore
                pro = new firebase.auth.FacebookAuthProvider();
                break;
            default:
                // @ts-ignore
                pro = new firebase.auth.EmailAuthProvider();
        }

        this.afa.signInWithPopup( pro )
            .then( value => {

                if ( value.additionalUserInfo.isNewUser ) {
                    this.addUser(
                        {
                            uId: value.user.uid,
                            uName: value.user.displayName,
                            uEmail: value.user.email,
                            uPhone: value.user.phoneNumber
                        } );
                }

                this.router.navigate( [ "/" + value.user.uid ] );
                this.loadingSubject.next( false );

            } )
            .catch( reason => {
                console.log( reason.errorCode );
                console.log( reason.message );
            } );

    }

    public logOut() {
        this.afa.signOut()
            .then( value => {
                this.router.navigate( [ "" ] );
            } )
            .catch( reason => {
                this.showToast( reason.message, 1000, "danger" );
            } );
    }

    public fetchUser( child?, condition?, value? ): Observable<UserModel[]> {
        if ( child ) {
            return this.afs
                       .collection<UserModel>( "users", ref => ref.where( child, condition, value ) )
                       .valueChanges();
        } else {
            return this.afs.collection<UserModel>( "users" ).valueChanges();
        }
    }

    public updateUser( user: UserModel ) {
        this.afs.collection( "users" )
            .doc( user.uId )
            .update( user );
    }

    public fetchChats( child?, condition?, value? ) {
        if ( child ) {
            return this.afs
                       .collection<ChatModel>( "chats", ref => ref.where( child, condition, value ) )
                       .valueChanges();
        }
        return this.afs
                   .collection<ChatModel>( "chats" )
                   .valueChanges();
    }

    public fetchChatWith( uId1: string, uId2: string ) {
        return this.afs
                   .collection<ChatModel>( "chats",
                                           ref => ref.where( "userIds", "array-contains", uId1 ) && ref.where( "userIds", "array-contains",
                                                                                                               uId2 ) )
                   .valueChanges();
    }

    public addChat( chat: ChatModel ) {
        this.afs
            .collection( "chats" )
            .doc( chat.chatId )
            .set( chat );
    }

    public updateChat( chat: ChatModel, cId: string ) {
        this.afs.collection( "chats" )
            .doc( cId )
            .update( chat );
    }

    async showToast( message: string, time?: number, color? ) {
        const toast = await this.tc.create( {
                                                message: message,
                                                duration: time || 2000,
                                                position: "bottom",
                                                translucent: true,
                                                animated: true,
                                                color: color || "primary"
                                            } );

        await toast.present();
    }

    private addUser( user: UserModel ) {
        this.afs.collection( "users" )
            .doc( user.uId )
            .set( user )
            .then( value => {
                this.showToast( "New user added!", 1000, "success" );
                this.router.navigate( [ "/", user.uId ] );
            } )
            .catch( reason => {
                this.showToast( reason.message, 3000, "danger" );
            } );
    }
}

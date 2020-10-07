import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { UserModel } from "../shared/models";
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

        this.afa.setPersistence( firebase.auth.Auth.Persistence.SESSION )
            .then( () => {
                this.afa.createUserWithEmailAndPassword( user.uEmail, password )
                    .then( value => {
                        user.uId = value.user.uid;
                        this.addUser( user );
                    } )
                    .catch( reason => {
                        this.showToast( "User cannot be created!", 4000, "danger" );
                    } );
            } );
    }

    public loginWithEmail( email: string, password: string ) {
        this.afa.setPersistence( firebase.auth.Auth.Persistence.SESSION )
            .then( () => {
                this.afa.signInWithEmailAndPassword( email, password )
                    .then( value => {
                        this.router.navigate( [ "/", value.user.uid ] );
                    } )
                    .catch( reason => {
                        this.showToast( reason.message, 4000, "danger" );
                    } );
            } );


    }

    public loginOAuth( type: string ) {}

    public logOut() {
        this.afa.signOut()
            .then( value => {
                this.router.navigate( [ "/login" ] );
            } )
            .catch( reason => {
                this.showToast( reason.message, 1000, "danger" );
            } );
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
}

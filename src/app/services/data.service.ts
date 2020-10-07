import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { userError } from "@angular/compiler-cli/src/transformers/util";
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

    public signUpWithEmail( email: string, password: string, name: string ) {

        this.afa.setPersistence( firebase.auth.Auth.Persistence.SESSION )
            .then( () => {
                this.afa.createUserWithEmailAndPassword( email, password )
                    .then( user => {
                        this.addUser( { uEmail: email, uId: user.user.uid, uName: name } );
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

    private showToast( message: string, time?: number, color? ) {
        this.tc.create( {
                            message,
                            duration: time || 2000,
                            position: "top",
                            translucent: true,
                            mode: "ios",
                            color: color || "primary"
                        } );
    }
}

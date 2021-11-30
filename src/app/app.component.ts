import { UserService } from "./services/user.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { RemoveAuthAction, SetAuthAction } from "./store/auth/auth.actions";
import firebase from "firebase/compat";
import { RemoveUserAction, setUserAction } from "./store/user/user.actions";
import User = firebase.User;

@Component( {
                selector : "app-root",
                templateUrl : "app.component.html",
                styleUrls : [ "app.component.scss" ]
            } )
export class AppComponent implements OnInit, OnDestroy {
    
    authSub : Subscription = new Subscription( undefined );
    
    constructor(
        private platform : Platform,
        private splashScreen : SplashScreen,
        private statusBar : StatusBar,
        private afa : AngularFireAuth,
        private store : Store<any>,
        private userService : UserService
    ) {
        this.initializeApp();
        this.fetchAuthState();
    }
    
    initializeApp() {
        this.platform.ready().then( () => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        } );
    }
    
    async ngOnInit() {
    }
    
    ngOnDestroy() {
        this.authSub.unsubscribe();
    }
    
    fetchAuthState = () => {
        this.authSub = this.afa.authState.subscribe( ( next : User ) => {
            if ( next ) {
                const clone = Object.freeze( next );
                this.store.dispatch( new SetAuthAction( clone ) );
                console.log({clone});
                this.userService.fetchUserByUId( next.uid ).get().then( ( snapShot ) => {
                    if ( !snapShot.empty ) {
                        this.store.dispatch( new setUserAction( snapShot.docs[0].data() ) );
                    }
                } );
            } else {
                this.store.dispatch( new RemoveAuthAction( undefined ) );
                this.store.dispatch( new RemoveUserAction( undefined ) );
            }
        } );
    };
    
    
}

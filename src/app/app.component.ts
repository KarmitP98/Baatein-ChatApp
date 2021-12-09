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
import { ChatService } from "./services/chat.service";
import { RootState } from "./store/root";
import { SetAllChatsAction } from "./store/chat/chat.actions";
import User = firebase.User;

@Component( {
                selector : "app-root",
                templateUrl : "app.component.html",
                styleUrls : [ "app.component.scss" ]
            } )
export class AppComponent implements OnInit, OnDestroy {
    
    authSub : Subscription = new Subscription( undefined );
    chatSub : Subscription = new Subscription( undefined );
    loading : boolean = true;
    
    constructor(
        private platform : Platform,
        private splashScreen : SplashScreen,
        private statusBar : StatusBar,
        private afa : AngularFireAuth,
        private store : Store<RootState>,
        private userService : UserService,
        private chatService : ChatService
    ) {
        this.fetchAuthState();
        this.initializeApp();
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
        if ( this.authSub ) {
            this.authSub.unsubscribe();
        }
        if ( this.chatSub ) {
            this.chatSub.unsubscribe();
        }
    }
    
    fetchAuthState = () => {
        this.authSub = this.afa.authState.subscribe( async ( next : User ) => {
            if ( next ) {
                const clone = Object.freeze( next );
                this.store.dispatch( new SetAuthAction( clone ) );
                await this.userService.fetchUserByUId( next.uid ).get().then( ( snapShot ) => {
                    if ( !snapShot.empty ) {
                        this.store.dispatch( new setUserAction( snapShot.docs[0].data() ) );
                    }
                } );
            } else {
                this.store.dispatch( new RemoveAuthAction( undefined ) );
                this.store.dispatch( new RemoveUserAction( undefined ) );
            }
            this.chatSub = this.chatService.fetchAllChats().valueChanges().subscribe( ( chats ) => {
                if ( chats?.length ) {
                    this.store.dispatch( new SetAllChatsAction( [ ...chats ] ) );
                } else {
                    this.store.dispatch( new SetAllChatsAction( undefined ) );
                }
                this.loading = false;
            } );
        } );
    };
    
    
}

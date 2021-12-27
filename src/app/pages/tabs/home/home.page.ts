import { Component, OnDestroy, OnInit } from "@angular/core";
import { RootState } from "../../../store/root";
import { Store } from "@ngrx/store";
import { ChatService } from "../../../services/chat.service";
import { Subscription } from "rxjs";
import ChatModel from "../../../models/ChatModel";
import { UserModel } from "../../../models/UserModel";
import { PopoverController } from "@ionic/angular";
import { HomePageMenuComponent } from "../../../components/home-page-menu/home-page-menu.component";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";

@Component( {
                selector : "app-home",
                templateUrl : "./home.page.html",
                styleUrls : [ "./home.page.scss" ]
            } )
export class HomePage implements OnInit, OnDestroy {
    
    chatSub : Subscription;
    userSub : Subscription;
    chats : ChatModel[] = [];
    currentUser : UserModel;
    loading = true;
    
    constructor( private store : Store<RootState>,
                 private chatService : ChatService,
                 private popoverController : PopoverController,
                 private authService : AuthService,
                 private router : Router ) { }
    
    ngOnInit() {
        // Fetch the value of current user from the store.
        this.userSub = this.store.select( "user" ).subscribe( user => {
            if ( user?.user ) {
                this.currentUser = user.user;
                // Fetch all the chats that have current user's uid in the betweenIds array
                this.chatSub = this.store.select( "chat" ).subscribe( value => {
                    if ( value?.allChats ) {
                        this.chats = value.allChats;
                    } else {
                        this.chats = [];
                    }
                    this.loading = false;
                } );
            }
        } );
    }
    
    ngOnDestroy() : void {
        if ( this.chatSub ) {
            this.chatSub.unsubscribe();
        }
        if ( this.userSub ) {
            this.userSub.unsubscribe();
        }
    }
    
    
    getCurrentUserAvatar() : string {
        return this.currentUser.profilePic || "assets/Avatars/user-default.jpg";
    }
    
    async showMenu( event : MouseEvent ) {
        const pop = await this.popoverController
                              .create( {
                                           component : HomePageMenuComponent,
                                           animated : true,
                                           backdropDismiss : true,
                                           showBackdrop : true,
                                           keyboardClose : true,
                                           event
                                       } );
        await pop.present();
        
        const { data } = await pop.onWillDismiss();
        if ( data?.selected ) {
            switch ( data.selected ) {
                case "logout":
                    await this.authService.logOut();
                    break;
                case "profile":
                    await this.router.navigate( [ "/", "tabs", "settings" ] );
            }
        }
    }
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { StoryService } from "../../services/story.service";
import { StoryModel } from "../../models/StoryModel";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { RootState } from "../../store/root";
import { UserModel } from "../../models/UserModel";

@Component( {
                selector : "app-stories",
                templateUrl : "./stories.component.html",
                styleUrls : [ "./stories.component.scss" ]
            } )
export class StoriesComponent implements OnInit, OnDestroy {
    
    loading = true;
    stories : StoryModel[] = [];
    storySub : Subscription = new Subscription( undefined );
    userSub : Subscription = new Subscription( undefined );
    currentUser : UserModel = undefined;
    
    constructor( private ss : StoryService, private store : Store<RootState> ) { }
    
    async ngOnInit() {
        await this.fetchCurrentUser();
        this.fetchAllStories();
    }
    
    ngOnDestroy() : void {
        if ( this.storySub ) {
            this.storySub.unsubscribe();
        }
        if ( this.userSub ) {
            this.userSub.unsubscribe();
        }
    }
    
    fetchCurrentUser = async () => {
        this.userSub = this.store.select( "user" ).subscribe( value => {
            if ( value?.user ) {
                this.currentUser = { ...value.user };
            }
        } );
    };
    
    fetchAllStories = () => {
        this.ss.fetchAllStories().ref.orderBy( "createdAt", "desc" ).onSnapshot( value => {
            this.loading = true;
            if ( !value.empty ) {
                this.stories = value.docs.map( doc => doc.data() );
            }
            this.loading = false;
        } );
    };
    
}

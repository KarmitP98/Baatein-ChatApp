import { Component, OnDestroy, OnInit } from "@angular/core";
import { StoryService } from "../../services/story.service";
import { StoryModel } from "../../models/StoryModel";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { RootState } from "../../store/root";
import { UserModel } from "../../models/UserModel";
import { loadStory } from "../../shared/animations/triggers";

@Component( {
                selector : "app-stories",
                templateUrl : "./stories.component.html",
                styleUrls : [ "./stories.component.scss" ],
                animations : [ loadStory ]
            } )
export class StoriesComponent implements OnInit, OnDestroy {
    
    loading = true;
    stories : StoryModel[] = [];
    storySub : Subscription = new Subscription( undefined );
    userSub : Subscription = new Subscription( undefined );
    currentUser : UserModel = undefined;
    users : {} = {};
    
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
                this.mapStoryToUser( this.stories );
            }
            this.loading = false;
        } );
    };
    
    mapStoryToUser = ( stories : StoryModel[] ) => {
        this.users = {};
        for ( let story of stories ) {
            if ( this.users[story.createdById] ) {
                if ( this.users[story.createdById].stories ) {
                    this.users[story.createdById].stories.push( story );
                } else {
                    this.users[story.createdById].stories = [ story ];
                }
            } else {
                this.users[story.createdById] = { user : story.createdBy, stories : [ story ] };
            }
        }
    };
    
    getKeys = ( object : object ) => {
        return Object.keys( object );
    };
    
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { StoryService } from "../../services/story.service";
import { StoryModel } from "../../models/StoryModel";
import { Subscription } from "rxjs";

@Component( {
                selector : "app-stories",
                templateUrl : "./stories.component.html",
                styleUrls : [ "./stories.component.scss" ]
            } )
export class StoriesComponent implements OnInit, OnDestroy {
    
    loading = true;
    stories : StoryModel[] = [];
    storySub : Subscription = new Subscription( undefined );
    
    constructor( private ss : StoryService ) { }
    
    ngOnInit() {
        this.fetchAllStories();
    }
    
    ngOnDestroy() : void {
        if ( this.storySub ) {
            this.storySub.unsubscribe();
        }
    }
    
    fetchAllStories = () => {
        this.storySub = this.ss.fetchAllStories().valueChanges().subscribe( value => {
            this.loading = true;
            if ( value?.length ) {
                this.stories = value;
            }
            this.loading = false;
        } );
    };
    
}

import { Component, Input, OnInit } from "@angular/core";
import { UserModel } from "../../models/UserModel";
import { StoryModel } from "../../models/StoryModel";

@Component( {
                selector : "app-story-item",
                templateUrl : "./story-item.component.html",
                styleUrls : [ "./story-item.component.scss" ]
            } )
export class StoryItemComponent implements OnInit {
    
    @Input() story : StoryModel;
    @Input() type : "story" | "add" = "story";
    loading = true;
    storyUser : UserModel;
    
    constructor() { }
    
    ngOnInit() {
        if ( this.story || this.type ) {
            this.story?.createdBy?.get()?.then( ( value ) => {
                if ( value.exists() ) {
                    this.storyUser = value.val();
                }
                this.loading = false;
            } );
            this.loading = false;
        }
    }
    
    addStory = () => {
        if ( this.type === "add" ) {
            // Create new story logic goes here...
        } else {
            this.viewStory();
        }
    };
    
    viewStory = () => {
        // View Story logic goes here...
    };
    
    getUserProfilePic = () => {
        return this.storyUser?.profilePic || "assets/Avatars/user-default.jpg";
    };
    
}

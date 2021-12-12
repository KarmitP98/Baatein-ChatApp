import { Component, Input, OnInit } from "@angular/core";

@Component( {
                selector : "app-story-item",
                templateUrl : "./story-item.component.html",
                styleUrls : [ "./story-item.component.scss" ]
            } )
export class StoryItemComponent implements OnInit {
    
    @Input() story : any;
    @Input() type : "story" | "add" = "story";
    loading = true;
    
    constructor() { }
    
    ngOnInit() {
        if ( this.story || this.type ) {
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
    
}

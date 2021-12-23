import { Component, Input, OnInit } from "@angular/core";
import { StoryModel } from "../../models/StoryModel";
import { UserModel } from "../../models/UserModel";
import { ModalController } from "@ionic/angular";

@Component( {
                selector : "app-view-story",
                templateUrl : "./view-story.component.html",
                styleUrls : [ "./view-story.component.scss" ]
            } )
export class ViewStoryComponent implements OnInit {
    
    @Input() story : StoryModel = undefined;
    @Input() currentUser : UserModel = undefined;
    @Input() storyUser : UserModel = undefined;
    interval;
    // TODO: Future functionality.
    // currentProgress : number = 0;
    // TIME_PER_STORY = 10_000;
    
    constructor( private modalController : ModalController ) { }
    
    ngOnInit() {
        // this.interval = setInterval( async () => {
        //     await this.close( false );
        // }, this.TIME_PER_STORY );
    }
    
    close = async ( output : boolean = false ) => {
        if ( output ) {
            return;
        }
        await this.modalController.dismiss();
    };
    
}

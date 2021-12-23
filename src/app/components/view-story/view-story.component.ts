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
    
    constructor( private modalController : ModalController ) { }
    
    ngOnInit() {}
    
    close = async ( output : boolean = false ) => {
        if ( output ) {
            return;
        }
        await this.modalController.dismiss();
    };
    
}

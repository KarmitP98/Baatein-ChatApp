import { Component, Input, OnInit } from "@angular/core";
import { StoryModel } from "../../models/StoryModel";
import { UserModel } from "../../models/UserModel";
import { ModalController, PopoverController } from "@ionic/angular";
import { StoryMenuComponent } from "../story-menu/story-menu.component";
import { StoryService } from "../../services/story.service";
import { NotificationService } from "../../services/notification.service";

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
    
    constructor( private modalController : ModalController,
                 private popoverController : PopoverController,
                 private storyService : StoryService,
                 private notificationService : NotificationService ) { }
    
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
    
    showPopover = async ( event : Event ) => {
        const pop = await this.popoverController
                              .create( {
                                           component : StoryMenuComponent,
                                           animated : true,
                                           backdropDismiss : true,
                                           keyboardClose : true,
                                           showBackdrop : true,
                                           event
                                       } );
        
        await pop.present();
        
        const { data } = await pop.onWillDismiss();
        if ( data?.selected === "delete" ) {
            await this.deleteStory( this.story );
        }
    };
    
    deleteStory = ( story : StoryModel ) => {
        this.storyService.deleteStory( this.story ).then( async () => {
            await this.close();
            await this.notificationService.showToast(
                { message : "Your story has been deleted Successfully!", duration : 5000, color : "success" } );
        } );
    };
    
}

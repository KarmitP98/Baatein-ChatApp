import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { StoryModel } from "../../models/StoryModel";
import { UserModel } from "../../models/UserModel";
import { IonSlides, ModalController, PopoverController } from "@ionic/angular";
import { StoryMenuComponent } from "../story-menu/story-menu.component";
import { StoryService } from "../../services/story.service";
import { NotificationService } from "../../services/notification.service";

@Component( {
                selector : "app-view-story",
                templateUrl : "./view-story.component.html",
                styleUrls : [ "./view-story.component.scss" ]
            } )
export class ViewStoryComponent implements OnInit {
    
    @Input() stories : StoryModel[] = [];
    @Input() currentUser : UserModel = undefined;
    @Input() storyUser : UserModel = undefined;
    interval;
    currentIndex : number = 0;
    slideOptions = {
        initialSlide : this.currentIndex,
        speed : 400
    };
    @ViewChild( "storySlides", { static : false } ) storySlides : IonSlides;
    
    constructor( private modalController : ModalController,
                 private popoverController : PopoverController,
                 private storyService : StoryService,
                 private notificationService : NotificationService ) { }
    
    ngOnInit() {
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
            await this.deleteStory( this.stories[this.currentIndex] );
        }
    };
    
    deleteStory = ( story : StoryModel ) => {
        this.storyService.deleteStory( story ).then( async () => {
            await this.close();
            await this.notificationService.showToast(
                { message : "Your story has been deleted Successfully!", duration : 5000, color : "success" } );
        } );
    };
    
    onSlideChange = async () => {
        if ( this.storySlides ) {
            this.currentIndex = await this.storySlides.getActiveIndex();
        }
    };
    
}

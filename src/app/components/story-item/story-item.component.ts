import { Component, Input, OnInit } from "@angular/core";
import { UserModel } from "../../models/UserModel";
import { StoryModel } from "../../models/StoryModel";
import { Camera } from "@awesome-cordova-plugins/camera/ngx";
import { ActionSheetController, ModalController, Platform } from "@ionic/angular";
import { PhotoService } from "../../service/photo.service";
import { NotificationService } from "../../services/notification.service";
import { encodeBase64 } from "../../shared/functions";
import { StoryService } from "../../services/story.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ViewStoryComponent } from "../view-story/view-story.component";
import { loadOpacity } from "../../shared/animations/triggers";

@Component( {
                selector : "app-story-item",
                templateUrl : "./story-item.component.html",
                styleUrls : [ "./story-item.component.scss" ],
                animations : [ loadOpacity ]
            } )
export class StoryItemComponent implements OnInit {
    
    @Input() story : StoryModel;
    @Input() user;
    @Input() type : "story" | "add" = "story";
    @Input() currentUser : UserModel = undefined;
    loading = true;
    storyUser : UserModel;
    currentPhoto : string = "";
    
    constructor( private camera : Camera,
                 private platform : Platform,
                 private actionSheetController : ActionSheetController,
                 private photoService : PhotoService,
                 private notificationService : NotificationService,
                 private storyService : StoryService,
                 private afs : AngularFirestore,
                 private modalController : ModalController ) { }
    
    ngOnInit() {
        if ( this.user || this.type ) {
            this.user?.user?.get()?.then( ( value ) => {
                if ( value.exists ) {
                    this.storyUser = value.data();
                }
                this.loading = false;
            } );
            this.loading = false;
        }
    }
    
    addStory = async () => {
        if ( this.type === "add" ) {
            // Create new story logic goes here...
            await this.openActionSheet();
        } else {
            await this.viewStory();
        }
    };
    
    viewStory = async () => {
        const modal = await this.modalController
                                .create( {
                                             component : ViewStoryComponent,
                                             componentProps : {
                                                 stories : this.user.stories,
                                                 currentUser : this.currentUser,
                                                 storyUser : this.storyUser
                                             },
                                             keyboardClose : true,
                                             swipeToClose : true,
                                             animated : true,
                                             showBackdrop : false
                                         } );
        await modal.present();
    };
    
    getUserProfilePic = () => {
        return this.currentPhoto || this.storyUser?.profilePic || "assets/Avatars/user-default.jpg";
    };
    
    openActionSheet = async () => {
        const actionSheet = await this.actionSheetController
                                      .create( {
                                                   animated : true,
                                                   keyboardClose : true,
                                                   backdropDismiss : true,
                                                   buttons : [
                                                       {
                                                           text : "Take a picture",
                                                           icon : "camera",
                                                           handler : () => {
                                                               this.takePicture();
                                                           }
                                                       },
                                                       {
                                                           text : "Select from Gallery",
                                                           icon : "images",
                                                           handler : () => {
                                                               this.selectFromGallery();
                                                           }
                                                       },
                                                       {
                                                           text : "Cancel",
                                                           icon : "close",
                                                           role : "cancel",
                                                           cssClass : "action-item-danger"
                                                       }
                                                   ]
                                               } );
        
        await actionSheet.present();
    };
    
    takePicture = () => {
        this.photoService.takePictureFromCamera()
            .then( async ( value ) => {
                const base64ImageURI = encodeBase64( value.toString(), "jpeg" );
                await this.uploadStory( base64ImageURI );
            } )
            .catch( async error => {
                await this.notificationService.showToast( { duration : 5000, color : "danger", message : error } );
            } );
    };
    
    
    selectFromGallery = () => {
        this.photoService.selectPhotoFromGallery()
            .then( async ( value ) => {
                const base64ImageURI = encodeBase64( value.toString(), "jpeg" );
                await this.uploadStory( base64ImageURI );
            } )
            .catch( async error => {
                await this.notificationService.showToast( { duration : 5000, color : "danger", message : error } );
            } );
    };
    
    uploadStory = async ( imageURI : string ) => {
        const id = this.afs.createId();
        const currentUserRef = this.afs.collection<UserModel>( "users" ).doc( this.currentUser.uId ).ref;
        const story : StoryModel = new StoryModel( id, new Date(), currentUserRef, this.currentUser.uId, imageURI );
        await this.storyService.createStory( story );
    };
}

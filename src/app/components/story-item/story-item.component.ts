import { Component, Input, OnInit } from "@angular/core";
import { UserModel } from "../../models/UserModel";
import { StoryModel } from "../../models/StoryModel";
import { Camera, CameraOptions } from "@awesome-cordova-plugins/camera/ngx";
import { Platform } from "@ionic/angular";

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
    currentPhoto : string = "";
    
    constructor( private camera : Camera, private platform : Platform ) { }
    
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
            this.takePhoto();
        } else {
            this.viewStory();
        }
    };
    
    viewStory = () => {
        // View Story logic goes here...
    };
    
    getUserProfilePic = () => {
        return this.currentPhoto || this.storyUser?.profilePic || "assets/Avatars/user-default.jpg";
    };
    
    takePhoto = () => {
        this.platform.ready().then( () => {
            if ( this.platform.is( "cordova" ) ) {
                const options : CameraOptions = {
                    quality : 100,
                    destinationType : this.camera.DestinationType.FILE_URI,
                    encodingType : this.camera.EncodingType.JPEG,
                    mediaType : this.camera.MediaType.PICTURE,
                    sourceType : this.camera.PictureSourceType.CAMERA,
                    saveToPhotoAlbum : true
                };
                
                this.camera.getPicture( options ).then( imageData => {
                    let base64Image = `data:image/jpeg;charset=utf-8;base64, ${ imageData }`;
                    console.log( base64Image, imageData );
                    this.currentPhoto = base64Image;
                } );
            }
        } );
        
    };
    
}

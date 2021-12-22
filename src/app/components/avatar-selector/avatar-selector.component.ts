import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ALL_AVATARS } from "../../shared/constants";

@Component( {
                selector : "app-avatar-selector",
                templateUrl : "./avatar-selector.component.html",
                styleUrls : [ "./avatar-selector.component.scss" ]
            } )
export class AvatarSelectorComponent implements OnInit {
    
    selectedProfilePicture : string = "";
    @Input() currentProfilePicture : string;
    allAvatars : string[] = ALL_AVATARS;
    
    constructor( private modelController : ModalController ) { }
    
    ngOnInit() {
        if ( this.currentProfilePicture ) {
            this.selectedProfilePicture = this.currentProfilePicture;
        }
    }
    
    close = ( b : boolean ) => {
        if ( b ) {
            this.modelController.dismiss( { selected : this.selectedProfilePicture } );
        } else {
            this.modelController.dismiss();
        }
    };
    
    selectAvatar = ( avatar : string ) => {
        this.selectedProfilePicture = avatar;
    };
}

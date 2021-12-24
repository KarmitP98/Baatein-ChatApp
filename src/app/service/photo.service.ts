import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from "@awesome-cordova-plugins/camera/ngx";

@Injectable( {
                 providedIn : "root"
             } )
export class PhotoService {
    
    
    DEFAULT_CAMERA_OPTIONS : CameraOptions = {
        quality : 100,
        destinationType : this.camera.DestinationType.DATA_URL,
        encodingType : this.camera.EncodingType.JPEG,
        correctOrientation : true
    };
    
    constructor( private camera : Camera ) { }
    
    takePictureFromCamera = async ( options : CameraOptions = {
        sourceType : this.camera.PictureSourceType.CAMERA,
        mediaType : this.camera.MediaType.PICTURE,
        saveToPhotoAlbum : true
    } ) => {
        return this.handleCameraAction( options );
    };
    
    selectPhotoFromGallery = ( options : CameraOptions = {
        sourceType : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        mediaType : this.camera.MediaType.PICTURE
    } ) => {
        return this.handleCameraAction( options );
    };
    
    handleCameraAction = ( options : CameraOptions ) => {
        return new Promise( ( resolve, reject ) => {
            this.camera.getPicture( { ...this.DEFAULT_CAMERA_OPTIONS, ...options } )
                .then( value => {
                    resolve( value );
                } )
                .catch( error => {
                    reject( error );
                } );
        } );
    };
}

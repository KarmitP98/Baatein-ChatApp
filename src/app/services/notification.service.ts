import { Injectable } from "@angular/core";
import { ToastController, ToastOptions } from "@ionic/angular";

@Injectable( {
                 providedIn : "root"
             } )
export class NotificationService {
    
    private toast;
    
    constructor( private tc : ToastController ) { }
    
    /**
     * Show a toast message with provided options
     * @param toastOptions
     */
    showToast = async ( toastOptions : ToastOptions ) => {
        this.toast = await this.tc.create( { ...toastOptions, position : "bottom" } );
        await this.toast.present();
    };
    
    /**
     * Dismiss the currently active toast.
     */
    hideToast = () => {
        this.toast.dismiss();
    };
    
}

import { Injectable } from "@angular/core";
import { ToastController, ToastOptions } from "@ionic/angular";

@Injectable( {
                 providedIn : "root"
             } )
export class NotificationService {
    
    private toast;
    
    constructor( private tc : ToastController ) { }
    
    
    showToast = async ( toastOptions : ToastOptions ) => {
        this.toast = await this.tc.create( { ...toastOptions, position : "bottom" } );
        await this.toast.present();
    };
    
    hideToast = () => {
        this.toast.dismiss();
    };
    
}

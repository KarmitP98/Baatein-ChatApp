import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable( {
                 providedIn: "root"
             } )
export class DataService {

    loadingSubject = new BehaviorSubject<boolean>( false );

    constructor(
        private afs: AngularFirestore,
        private tc: ToastController,
        private afa: AngularFireAuth,
        private router: Router
    ) { }


    private showToast( message, time?, color? ) {
        this.tc.create( {
                            message: message,
                            duration: time || 2000,
                            position: "top",
                            translucent: true,
                            mode: "ios",
                            color: color || "primary"
                        } );
    }
}

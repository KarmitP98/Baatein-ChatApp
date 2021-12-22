import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { StoreModule } from "@ngrx/store";
import { rootReducer } from "./store/root";
import { Camera } from "@awesome-cordova-plugins/camera/ngx";

const firebaseConfig = {
    apiKey : "AIzaSyD8MXZJ9gYQcRCrd1-sqUfaF7UMXmlgDOk",
    authDomain : "baatein-7a.firebaseapp.com",
    databaseURL : "https://baatein-7a.firebaseio.com",
    projectId : "baatein-7a",
    storageBucket : "baatein-7a.appspot.com",
    messagingSenderId : "1057128048906",
    appId : "1:1057128048906:web:f562c6fbeb318abfc872f3",
    measurementId : "G-L2KPQJ81JS"
};

// class CameraMock extends Camera {
//     getPicture( options ) {
//         return new Promise( ( resolve, reject ) => {
//             resolve( "BASE_64_ENCODED_DATA_GOES_HERE" );
//         } );
//     }
// }

@NgModule( {
               declarations : [ AppComponent ],
               entryComponents : [],
               imports : [ BrowserModule,
                           IonicModule.forRoot(),
                           AppRoutingModule,
                           AngularFireModule.initializeApp( firebaseConfig ),
                           BrowserAnimationsModule,
                           StoreModule.forRoot( rootReducer ) ],
               providers : [
                   StatusBar,
                   SplashScreen,
                   { provide : RouteReuseStrategy, useClass : IonicRouteStrategy },
                   Camera,
                   AngularFirestore
               ],
               bootstrap : [ AppComponent ]
           } )
export class AppModule {}

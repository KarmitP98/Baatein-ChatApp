import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestore } from "@angular/fire/firestore";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MenuComponent } from "./components/menu/menu.component";
import { ProSelectComponent } from "./components/pro-select/pro-select.component";
import { UserPageComponent } from "./components/user-page/user-page.component";

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

@NgModule( {
               declarations : [ AppComponent, MenuComponent, ProSelectComponent, UserPageComponent ],
               entryComponents : [],
               imports : [ BrowserModule,
                           IonicModule.forRoot(),
                           AppRoutingModule,
                           AngularFireModule.initializeApp( firebaseConfig ),
                           BrowserAnimationsModule ],
               providers : [
                   StatusBar,
                   SplashScreen,
                   { provide : RouteReuseStrategy, useClass : IonicRouteStrategy },
                   AngularFirestore
               ],
               bootstrap : [ AppComponent ]
           } )
export class AppModule {}

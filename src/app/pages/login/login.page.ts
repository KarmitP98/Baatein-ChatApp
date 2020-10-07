import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../../services/data.service";
import { Platform } from "@ionic/angular";
import { NgForm } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";

@Component( {
                selector: "app-login",
                templateUrl: "./login.page.html",
                styleUrls: [ "./login.page.scss" ]
            } )
export class LoginPage implements OnInit {

    userEmail: string;
    userPassword: string;
    @ViewChild( "loginForm", { static: false } ) loginForm: NgForm;

    constructor( public ds: DataService,
                 private afa: AngularFireAuth,
                 public platform: Platform ) { }

    ngOnInit() {
    }

    login(): void {
        this.ds.loginWithEmail( this.userEmail, this.userPassword );
        this.loginForm.resetForm();
    }

    loginWithProvider( provider: string ) {
        if ( this.platform.is( "cordova" ) ) {

        } else {
            this.ds.loginOAuth( provider );
            this.loginForm.resetForm();
        }
    }

}

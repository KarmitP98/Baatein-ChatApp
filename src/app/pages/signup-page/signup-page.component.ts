import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { NgForm } from "@angular/forms";
import { UserModel } from "../../models/UserModel";
import { IonSlides } from "@ionic/angular";

@Component( {
                selector : "app-signup-page",
                templateUrl : "./signup-page.component.html",
                styleUrls : [ "./signup-page.component.scss" ]
            } )
export class SignupPageComponent implements OnInit {
    
    email = "";
    password = "";
    step = 0;
    name = "";
    @ViewChild( "emailForm", { static : false } ) emailForm : NgForm;
    @ViewChild( "userNameForm", { static : false } ) userNameForm : NgForm;
    @ViewChild( "slides", { static : false } ) slides : IonSlides;
    processing = false;
    
    constructor( private authService : AuthService ) { }
    
    async ngOnInit() {
    }
    
    async handleUserNameSubmit() {
        this.processing = true;
        const user : UserModel = new UserModel( this.email, this.password, this.name );
        await this.authService.signUpWithEmailAndPassword( user );
        this.processing = false;
    }
    
    handleEmailReset() {
        this.emailForm.resetForm();
    }
    
    handleUsernameReset() {
        this.userNameForm.resetForm();
    }
    
    handleEmailSubmit() : void {
        this.processing = true;
        
        // TODO: Implement checking if a registered email exists.
        this.step = 1;
        this.processing = false;
    }
}

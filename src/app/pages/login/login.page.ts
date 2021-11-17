import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component( {
                selector : "app-login",
                templateUrl : "./login.page.html",
                styleUrls : [ "./login.page.scss" ]
            } )
export class LoginPage implements OnInit {
    
    email : string = "";
    password : string = "";
    showError : string = undefined;
    processing : boolean = false;
    
    constructor( private authService : AuthService ) { }
    
    ngOnInit() {
    }
    
    handleSubmit = async () => {
        this.processing = true;
        await this.authService.loginWithEmailAndPassword( this.email, this.password ).catch( error => {
            this.showErrorMessage( error.message );
        } );
        this.processing = false;
    };
    
    showErrorMessage = ( error : string, duration : number = 50000 ) => {
        this.showError = error;
        setTimeout( () => {
            this.showError = undefined;
        }, duration );
    };
    
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { NotificationService } from "../../services/notification.service";

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
    
    constructor( private authService : AuthService, private ns : NotificationService ) { }
    
    ngOnInit() {
    }
    
    /**
     * Login with provided email and password
     */
    handleSubmit = async () => {
        this.processing = true;
        await this.authService.loginWithEmailAndPassword( this.email, this.password ).catch( error => {
            this.showErrorMessage( error.message );
        } );
        this.processing = false;
    };
    
    
    /**
     * Show error toast in case of any error occur
     * @param error
     * @param duration
     */
    showErrorMessage = async ( error : string, duration : number = 5000 ) => {
        await this.ns.showToast( { message : error, duration, color : "danger" } );
    };
    
}

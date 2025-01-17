import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { NgForm } from "@angular/forms";
import { UserModel } from "../../models/UserModel";
import { IonSlides } from "@ionic/angular";
import { UserService } from "../../services/user.service";
import { NotificationService } from "../../services/notification.service";

@Component( {
                selector : "app-signup-page",
                templateUrl : "./signup-page.component.html",
                styleUrls : [ "./signup-page.component.scss" ]
            } )
export class SignupPageComponent implements OnInit, AfterViewInit {
    
    email = "";
    password = "";
    step = 0;
    name = "";
    @ViewChild( "emailForm", { static : false } ) emailForm : NgForm;
    @ViewChild( "userNameForm", { static : false } ) userNameForm : NgForm;
    @ViewChild( "slides" ) slides : IonSlides;
    processing = false;
    allowSlideBack : boolean = false;
    allowSlideForward : boolean = false;
    slideOptions = { initialSlide : 0 };
    showEmailError = undefined;
    
    constructor( private authService : AuthService, private userService : UserService, private ns : NotificationService ) { }
    
    async ngOnInit() {
    }
    
    async ngAfterViewInit() : Promise<void> {
        await this.slides.lockSwipes( true );
        await this.slides.lockSwipeToNext( this.allowSlideForward );
        await this.slides.lockSwipeToPrev( this.allowSlideBack );
    }
    
    /**
     * Handle creating a new user using the email and password provided.
     * Pass the user object to create a new entry in the users collection.
     */
    async handleUserNameSubmit() {
        this.processing = true;
        const user : UserModel = new UserModel( this.email, this.password, this.name );
        await this.authService.signUpWithEmailAndPassword( user );
        this.processing = false;
    }
    
    /**
     * Reset email form
     */
    handleEmailReset() {
        this.emailForm.resetForm();
    }
    
    /**
     * Reset the username form
     */
    handleUsernameReset() {
        this.userNameForm.resetForm();
    }
    
    /**
     * Handle email form submit.
     * Check if the email already exists in the system.
     * If yes, show an error.
     * Else, move forward with the next step of entering username and password
     */
    async handleEmailSubmit() : Promise<void> {
        this.processing = true;
        if ( this.email ) {
            // TODO: Implement checking if a registered email exists.
            const userExists = await this.userService.checkIfUserEmailExists( this.email );
            if ( userExists ) {
                this.step = 0;
                this.setEmailError( "This email already has a registered account!" );
            } else {
                this.step = 1;
                await this.slides.slideNext();
            }
        } else {
            this.setEmailError( "Please enter a valid email address!" );
        }
        this.processing = false;
    }
    
    /**
     * Show Pager
     */
    showPager() : boolean {
        return this.allowSlideForward;
    }
    
    /**
     * Show error
     * @param error
     * @param duration
     */
    setEmailError = async ( error : string, duration : number = 5000 ) => {
        await this.ns.showToast( { message : error, duration, color : "danger" } );
    };
}

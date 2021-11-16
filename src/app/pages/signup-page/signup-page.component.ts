import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { NgForm } from "@angular/forms";
import { UserModel } from "../../models/UserModel";
import { IonSlides } from "@ionic/angular";
import { UserService } from "../../services/user.service";

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
    
    constructor( private authService : AuthService, private userService : UserService ) { }
    
    async ngOnInit() {
    }
    
    async ngAfterViewInit() : Promise<void> {
        await this.slides.lockSwipes( true );
        await this.slides.lockSwipeToNext( this.allowSlideForward );
        await this.slides.lockSwipeToPrev( this.allowSlideBack );
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
    
    async handleEmailSubmit() : Promise<void> {
        this.processing = true;
        
        // TODO: Implement checking if a registered email exists.
        const userExists = await this.userService.checkIfUserEmailExists( this.email );
    
        if ( userExists ) {
            this.step = 0;
            this.allowSlideForward = false;
        } else {
            this.step = 1;
            this.allowSlideForward = true;
            await this.slides.slideNext();
        }
        await this.slides.lockSwipeToNext( this.allowSlideForward );
        this.processing = false;
    }
    
    showPager() : boolean {
        return this.allowSlideForward;
    }
}

import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserModel } from "../../shared/models";
import { NgForm } from "@angular/forms";
import { PopoverController } from "@ionic/angular";
import { ProSelectComponent } from "../../components/pro-select/pro-select.component";

@Component( {
                selector : "app-signup",
                templateUrl : "./signup.page.html",
                styleUrls : [ "./signup.page.scss" ]
            } )
export class SignupPage implements OnInit {
    
    uName : string = "";
    uEmail : string = "";
    uPhone : string;
    password : string = "";
    proPic : string = "/assets/Avatars/Av1.jpg";
    
    @ViewChild( "signForm", { static : false } ) signForm : NgForm;
    
    constructor( public ds : DataService,
                 private popoverController : PopoverController ) { }
    
    ngOnInit() {
    }
    
    signUp() : void {
        const user : UserModel = { uId : "", uEmail : this.uEmail, uName : this.uName, uPhone : this.uPhone, uProPic : this.proPic };
        this.ds.signUpWithEmail( user, this.password );
        this.signForm.resetForm();
    }
    
    async openProfileSelector() {
        const pop = await this.popoverController.create( {
                                                             component : ProSelectComponent,
                                                             mode : "md",
                                                             animated : true,
                                                             translucent : true,
                                                             backdropDismiss : false,
                                                             keyboardClose : false
                                                         } );
        await pop.present();
        
        const { data } = await pop.onWillDismiss();
        this.proPic = data.selected;
    }
}

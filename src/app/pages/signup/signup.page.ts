import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserModel } from "../../shared/models";
import { NgForm } from "@angular/forms";

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
    
    @ViewChild( "signForm", { static : false } ) signForm : NgForm;
    
    constructor( public ds : DataService ) { }
    
    ngOnInit() {
    }
    
    signUp() : void {
        const user : UserModel = { uId : "", uEmail : this.uEmail, uName : this.uName, uPhone : this.uPhone };
        this.ds.signUpWithEmail( user, this.password );
        this.signForm.resetForm();
    }
}

import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../../services/data.service";
import { UserModel } from "../../shared/models";
import { NgForm } from "@angular/forms";

@Component( {
                selector: "app-signup",
                templateUrl: "./signup.page.html",
                styleUrls: [ "./signup.page.scss" ]
            } )
export class SignupPage implements OnInit {

    user: UserModel = { uId: "", uEmail: "", uName: "" };
    password: string;

    @ViewChild( "signForm", { static: false } ) signForm: NgForm;

    constructor( public ds: DataService ) { }

    ngOnInit() {
    }

    signUp(): void {
        this.ds.signUpWithEmail( this.user, this.password );
        this.signForm.resetForm();
    }
}

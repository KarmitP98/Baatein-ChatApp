import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { DataService } from "../../services/data.service";

@Component( {
                selector: "app-signup",
                templateUrl: "./signup.page.html",
                styleUrls: [ "./signup.page.scss" ]
            } )
export class SignupPage implements OnInit {

    userName: string;
    userEmail: string;
    userPassword: string;
    userPhone: number;
    userProPicUrl: string;

    @ViewChild( IonSlides ) slides: IonSlides;

    slideOpts = {
        initialSlide: 0
    };

    constructor(public ds: DataService) { }

    ngOnInit() {
    }

    changePage( page: number ): void {
        this.slides.slideTo( page );
    }

    signUp(): void {

    }
}

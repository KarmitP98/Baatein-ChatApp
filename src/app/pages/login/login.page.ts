import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";

@Component( {
                selector: "app-login",
                templateUrl: "./login.page.html",
                styleUrls: [ "./login.page.scss" ]
            } )
export class LoginPage implements OnInit, OnDestroy {

    email: string;
    password: string;

    constructor( private ds: DataService ) { }

    ngOnInit() { }

    ngOnDestroy(): void {}

    login(): void {
        this.ds.loginWithEmail( this.email, this.password );
    }

    keypressed( $event: KeyboardEvent ): void {
        if ( $event.key === "Enter" ) {
            this.login();
        }
    }
}

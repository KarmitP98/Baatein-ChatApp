import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";

@Component( {
                selector: "app-login",
                templateUrl: "./login.page.html",
                styleUrls: [ "./login.page.scss" ]
            } )
export class LoginPage implements OnInit, OnDestroy {

    public email: string = "";
    public password: string = "";

    constructor( public ds: DataService ) { }

    ngOnInit() { }

    ngOnDestroy(): void {}

    login(): void {

    }

    keypressed( $event: KeyboardEvent ): void {
        if ( $event.key === "Enter" ) {
            this.login();
        }
    }
}

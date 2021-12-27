import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component( {
                selector : "app-home-page-menu",
                templateUrl : "./home-page-menu.component.html",
                styleUrls : [ "./home-page-menu.component.scss" ]
            } )
export class HomePageMenuComponent implements OnInit {
    
    constructor( private popoverController : PopoverController ) { }
    
    ngOnInit() {}
    
    close = async ( selected : string ) => {
        if ( selected ) {
            await this.popoverController.dismiss( { selected } );
            return;
        }
        await this.popoverController.dismiss();
    };
    
}

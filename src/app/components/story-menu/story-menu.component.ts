import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component( {
                selector : "app-story-menu",
                templateUrl : "./story-menu.component.html",
                styleUrls : [ "./story-menu.component.scss" ]
            } )
export class StoryMenuComponent implements OnInit {
    
    constructor( private popoverController : PopoverController ) { }
    
    ngOnInit() {}
    
    close = async ( selected : string = undefined ) => {
        await this.popoverController.dismiss( { selected } );
    };
    
}

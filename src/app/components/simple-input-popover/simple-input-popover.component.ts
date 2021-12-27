import { Component, Input, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component( {
                selector : "app-simple-input-popover",
                templateUrl : "./simple-input-popover.component.html",
                styleUrls : [ "./simple-input-popover.component.scss" ]
            } )
export class SimpleInputPopoverComponent implements OnInit {
    
    @Input( "type" ) inputType : string = "text";
    @Input() placeholder : string = "";
    input : string = "";
    
    constructor( private popoverController : PopoverController ) { }
    
    ngOnInit() {}
    
    close = async ( output : boolean ) => {
        if ( output ) {
            await this.popoverController.dismiss( { input : this.input } );
            return;
        }
        await this.popoverController.dismiss();
    };
    
}

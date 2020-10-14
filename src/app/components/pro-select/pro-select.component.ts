import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component( {
              selector : "app-pro-select",
              templateUrl : "./pro-select.component.html",
              styleUrls : [ "./pro-select.component.scss" ]
            } )
export class ProSelectComponent implements OnInit {
  
  selected : string = "";
  baseUrl : string = "/assets/Avatars/Av";
  ext : string = ".jpg";
  size : number;
  avatars : string[] = [];
  
  constructor( private popoverController : PopoverController ) { }
  
  ngOnInit() {
    let i : number = 0;
    for ( i === 0; i < 9; i++ ) {
      this.avatars.push( this.baseUrl + (i + 1) + this.ext );
    }
    this.selected = this.avatars[0];
  }
  
  dismiss() : void {
    this.popoverController.dismiss( { selected : this.selected } );
  }
  
  select( item : string ) : void {
    this.selected = item;
  }
}

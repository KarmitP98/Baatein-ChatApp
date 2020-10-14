import { Component, Input, OnInit } from "@angular/core";
import { UserModel } from "../../shared/models";
import { ModalController } from "@ionic/angular";

@Component( {
              selector : "app-user-page",
              templateUrl : "./user-page.component.html",
              styleUrls : [ "./user-page.component.scss" ]
            } )
export class UserPageComponent implements OnInit {
  
  @Input( "user" ) user : UserModel;
  
  constructor( private modalController : ModalController ) { }
  
  ngOnInit() {}
  
  dismiss() : void {
    this.modalController.dismiss();
  }
}

import { Component, Input, OnInit } from "@angular/core";
import { UserModel } from "../../../shared/models";
import { ModalController } from "@ionic/angular";

@Component( {
                selector : "app-user-page",
                templateUrl : "./user-info.component.html",
                styleUrls : [ "./user-info.component.scss" ]
            } )
export class UserInfoComponent implements OnInit {
    
    @Input( "user" ) user : UserModel;
    
    constructor( private modalController : ModalController ) { }
    
    ngOnInit() {}
    
    dismiss() : void {
        this.modalController.dismiss();
    }
}

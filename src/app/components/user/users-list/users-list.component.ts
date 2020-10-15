import { Component, Input, OnInit } from "@angular/core";
import { UserModel } from "../../../shared/models";
import { ModalController } from "@ionic/angular";

@Component( {
                selector : "app-users-list",
                templateUrl : "./users-list.component.html",
                styleUrls : [ "./users-list.component.scss" ]
            } )
export class UsersListComponent implements OnInit {
    
    @Input( "users" ) users : UserModel[];
    
    constructor( private modalController : ModalController ) { }
    
    ngOnInit() {}
    
    dismiss( user? : UserModel ) : void {
        if ( user ) {
            this.modalController.dismiss( { user : user } );
        }
        this.modalController.dismiss();
    }
    
    
}

import { Component, OnInit } from "@angular/core";
import { UserModel } from "../../../shared/models";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component( {
                selector : "app-user-detail",
                templateUrl : "./user-detail.page.html",
                styleUrls : [ "./user-detail.page.scss" ]
            } )
export class UserDetailPage implements OnInit {
    
    user : UserModel;
    
    constructor( private dataService : DataService,
                 private router : Router,
                 private route : ActivatedRoute ) {
        const uid = this.route.snapshot.params["uId"];
        
        var tempSub : Subscription;
        tempSub = this.dataService.fetchUser( "uId", "==", uid )
                      .subscribe( value => {
                          if ( value ) {
                              this.user = value[0];
                          }
                          tempSub.unsubscribe();
                      } );
    }
    
    ngOnInit() {
    }
    
    
    dismiss( save : boolean ) : void {
        if ( save ) {
            this.dataService.updateUser( this.user );
        }
        
        this.router.navigate( [ "/", this.user.uId ] );
        
    }
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserModel } from "../../../shared/models";
import { DataService } from "../../../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ProSelectComponent } from "../../../components/pro-select/pro-select.component";
import { PopoverController } from "@ionic/angular";

@Component( {
                selector : "app-user-detail",
                templateUrl : "./user-detail.page.html",
                styleUrls : [ "./user-detail.page.scss" ]
            } )
export class UserDetailPage implements OnInit, OnDestroy {
    
    user : UserModel;
    
    constructor( private dataService : DataService,
                 private router : Router,
                 private route : ActivatedRoute,
                 private popoverController : PopoverController ) {
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
    
    ngOnDestroy() : void {}
    
    dismiss( save : boolean ) : void {
        if ( save ) {
            this.dataService.updateUser( this.user );
        }
        
        this.router.navigate( [ "/", this.user.uId ] );
        
    }
    
    async openProfileSelector() {
        const pop = await this.popoverController.create( {
                                                             component : ProSelectComponent,
                                                             mode : "md",
                                                             animated : true,
                                                             translucent : true,
                                                             backdropDismiss : false,
                                                             keyboardClose : false
                                                         } );
        await pop.present();
        
        const { data } = await pop.onWillDismiss();
        this.user.uProPic = data.selected;
    }
}

import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable( {
                 providedIn: "root"
             } )
export class LoginGuard implements CanActivate {

    constructor( private router: Router,
                 private afa: AngularFireAuth ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return new Promise( resolve => {
            this.afa.currentUser.then( value => {
                console.log(value);
                if ( value ) {
                    resolve( this.router.navigate( [ "/" + value.uid ] ) );
                } else {
                    resolve( true );
                }
            } );
        } );
    }

}

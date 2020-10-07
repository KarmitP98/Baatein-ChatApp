import { Injectable } from "@angular/core";
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable( {
                 providedIn: "root"
             } )
export class AuthGuard implements CanActivate, CanDeactivate<unknown> {

    constructor( private afa: AngularFireAuth,
                 private router: Router ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return new Promise( resolve => {
            this.afa.currentUser.then( value => {
                if ( value ) {
                    resolve( true );
                } else {
                    resolve( this.router.navigate( [ "/login" ] ) );
                }
            } );
        } );
    }

    canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise( resolve => {
            this.afa.currentUser.then( value => {
                if ( value ) {
                    resolve( false );
                } else {
                    resolve( this.router.navigate( [ "/login" ] ) );
                }
            } );
        } );
    }

}

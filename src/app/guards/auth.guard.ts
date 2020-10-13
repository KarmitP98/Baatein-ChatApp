import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
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
            const sub = this.afa.authState.subscribe( value => {
                if ( value ) {
                    sub.unsubscribe();
                    resolve( true );
                } else {
                    sub.unsubscribe();
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
            const sub = this.afa.authState.subscribe( value => {
                if ( value ) {
                    sub.unsubscribe();
                    resolve( false );
                } else {
                    sub.unsubscribe();
                    resolve( true );
                }
            } );
        } );
    }

}

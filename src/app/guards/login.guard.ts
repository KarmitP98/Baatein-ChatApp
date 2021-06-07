import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable( {
                 providedIn: 'root',
             } )
export class LoginGuard implements CanActivate {
    
    constructor( private router: Router,
                 private afa: AngularFireAuth ) {}
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
        return new Promise( resolve => {
            const sub = this.afa.authState.subscribe( value => {
                if (value) {
                    if (!localStorage.getItem( 'UID' )) {
                        localStorage.setItem( 'UID', JSON.stringify( value.uid ) );
                    }
                    sub.unsubscribe();
                    resolve( this.router.navigate( [ '/snazzy' ] ) );
                }
                else {
                    if (localStorage.getItem( 'UID' )) {
                        localStorage.removeItem( 'UID' );
                    }
                    sub.unsubscribe();
                    resolve( true );
                }
            } );
        } );
    }
    
}

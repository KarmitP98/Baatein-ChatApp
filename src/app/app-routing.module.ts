import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes : Routes = [
    { path : "signup", loadChildren : () => import("./pages/signup-page/signup-page.module").then( m => m.SignupPageComponentModule ) }

];

@NgModule( {
               imports : [
                   RouterModule.forRoot( routes, { preloadingStrategy : PreloadAllModules } )
               ],
               exports : [ RouterModule ]
           } )
export class AppRoutingModule {}

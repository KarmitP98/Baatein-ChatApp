import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { SignupPageComponent } from "./signup-page.component";

const routes : Routes = [
    { path : "", component : SignupPageComponent }

];

@NgModule( {
               imports : [
                   RouterModule.forRoot( routes, { preloadingStrategy : PreloadAllModules } )
               ],
               exports : [ RouterModule ]
           } )
export class SignupPageRoutingModule {}

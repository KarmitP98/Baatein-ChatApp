import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginGuard } from "./guards/login.guard";

const routes : Routes = [
    { path : "", pathMatch : "full", redirectTo : "login" },
    { path : "signup", loadChildren : () => import("./pages/signup-page/signup-page.module").then( m => m.SignupPageComponentModule ) },
    {
        path : "login",
        loadChildren : () => import("./pages/login/login.module").then( m => m.LoginPageModule ),
        canActivate : [ LoginGuard ]
    },
    {
        path : "tabs",
        loadChildren : () => import("./pages/tabs/tabs.module").then( m => m.TabsPageModule )
    },
    {
        path : "chat",
        loadChildren : () => import("./pages/chat/chat.module").then( m => m.ChatPageModule )
    },
    {
        path : "**",
        loadChildren : () => import("./pages/page-not-found/page-not-found.module").then( m => m.PageNotFoundPageModule )
    }

];

@NgModule( {
               imports : [
                   RouterModule.forRoot( routes, { preloadingStrategy : PreloadAllModules } )
               ],
               exports : [ RouterModule ]
           } )
export class AppRoutingModule {}

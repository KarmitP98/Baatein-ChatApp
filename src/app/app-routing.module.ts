import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        loadChildren: () => import("./pages/login/login.module").then( m => m.LoginPageModule )
    },
    {
        path: "signup",
        loadChildren: () => import("./pages/signup/signup.module").then( m => m.SignupPageModule )
    },
    {
        path: ":userId",
        loadChildren: () => import("./pages/dashboard/dashboard.module").then( m => m.DashboardPageModule )
    }
];

@NgModule( {
               imports: [
                   RouterModule.forRoot( routes, { preloadingStrategy: PreloadAllModules } )
               ],
               exports: [ RouterModule ]
           } )
export class AppRoutingModule {}

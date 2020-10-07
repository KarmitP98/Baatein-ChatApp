import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginGuard } from "./guards/login.guard";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        loadChildren: () => import("./pages/login/login.module").then( m => m.LoginPageModule ),
        canActivate: [ LoginGuard ]
    },
    {
        path: "signup",
        loadChildren: () => import("./pages/signup/signup.module").then( m => m.SignupPageModule ),
        canActivate: [ LoginGuard ]
    },
    {
        path: ":userId",
        loadChildren: () => import("./pages/dashboard/dashboard.module").then( m => m.DashboardPageModule ),
        canActivate: [ AuthGuard ],
        canDeactivate: [ AuthGuard ]
    }
];

@NgModule( {
               imports: [
                   RouterModule.forRoot( routes, { preloadingStrategy: PreloadAllModules } )
               ],
               exports: [ RouterModule ]
           } )
export class AppRoutingModule {}

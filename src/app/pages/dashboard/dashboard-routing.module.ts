import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardPage } from "./dashboard.page";
import { UserDetailPage } from "./user-detail/user-detail.page";

const routes: Routes = [
    {
        path : "",
        component : DashboardPage
    },
    {
        path : "details",
        component : UserDetailPage,
        loadChildren : () => import("../dashboard/user-detail/user-detail.module").then( m => m.UserDetailPageModule )
    }
];

@NgModule( {
               imports: [ RouterModule.forChild( routes ) ],
               exports: [ RouterModule ]
           } )
export class DashboardPageRoutingModule {}

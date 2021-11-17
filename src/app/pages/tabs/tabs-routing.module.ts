import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes : Routes = [
    {
        path : "",
        component : TabsPage
    },
    {
        path : "home",
        children : [
            {
                path : "",
                loadChildren : () => import("./home/home.module").then( m => m.HomePageModule )
            }
        ]
    }
];

@NgModule( {
               imports : [ RouterModule.forChild( routes ) ],
               exports : [ RouterModule ]
           } )
export class TabsPageRoutingModule {}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes : Routes = [
    {
        path : "",
        component : TabsPage,
        children : [
            {
                path : "home",
                children : [
                    {
                        path : "",
                        loadChildren : () => import("./home/home.module").then( m => m.HomePageModule )
                    }
                ]
            }, {
                path : "contacts",
                loadChildren : () => import("./contacts/contacts.module").then( m => m.ContactsPageModule )
            },
            {
                path : "settings",
                loadChildren : () => import("./settings/settings.module").then( m => m.SettingsPageModule )
            }
        ]
    }
];

@NgModule( {
               imports : [ RouterModule.forChild( routes ) ],
               exports : [ RouterModule ]
           } )
export class TabsPageRoutingModule {}

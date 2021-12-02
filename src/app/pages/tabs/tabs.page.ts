import { Component, OnInit, ViewChild } from "@angular/core";
import { IonTabs } from "@ionic/angular";

@Component( {
                selector : "app-tabs",
                templateUrl : "./tabs.page.html",
                styleUrls : [ "./tabs.page.scss" ]
            } )
export class TabsPage implements OnInit {
    
    @ViewChild( "tabBar", { static : false } ) tabBar : IonTabs;
    @ViewChild( "indicator", { static : false } ) indicator : HTMLElement;
    selectedTab = "";
    tabs : { tab : string, icon : string, text : string }[] = [
        { tab : "home", icon : "home", text : "Home" },
        { tab : "contacts", icon : "people", text : "Contacts" },
        { tab : "settings", icon : "settings", text : "Settings" }
    ];
    
    constructor() {}
    
    ngOnInit() {
    }
    
    setSelected = () => {
        this.selectedTab = this.tabBar.getSelected();
    };
}

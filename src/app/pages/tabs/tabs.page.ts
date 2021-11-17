import { Component, OnInit } from "@angular/core";

@Component( {
                selector : "app-tabs",
                templateUrl : "./tabs.page.html",
                styleUrls : [ "./tabs.page.scss" ]
            } )
export class TabsPage implements OnInit {
    
    tabs : { tab : string, icon : string, text : string }[] = [
        { tab : "chats", icon : "home", text : "Home" },
        { tab : "contacts", icon : "contacts", text : "Contacts" },
        { tab : "settings", icon : "settings", text : "Settings" }
    ];
    
    constructor() {}
    
    ngOnInit() {
    }
    
}

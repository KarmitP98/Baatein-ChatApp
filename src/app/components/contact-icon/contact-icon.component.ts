import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { UserModel } from "../../models/UserModel";

@Component( {
                selector : "app-contact-icon",
                templateUrl : "./contact-icon.component.html",
                styleUrls : [ "./contact-icon.component.scss" ]
            } )
export class ContactIconComponent implements OnInit, AfterViewInit {
    
    @Input() contact : UserModel;
    loading = true;
    
    constructor() { }
    
    ngOnInit() {
        this.loading = !this.contact;
    }
    
    ngAfterViewInit() : void {
    }
    
    
}

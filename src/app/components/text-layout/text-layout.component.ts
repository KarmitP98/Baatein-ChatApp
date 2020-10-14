import { Component, Input, OnInit } from "@angular/core";
import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

@Component( {
              selector : "app-text-layout",
              templateUrl : "./text-layout.component.html",
              styleUrls : [ "./text-layout.component.scss" ]
            } )
export class TextLayoutComponent implements OnInit {
  
  @Input( "text" ) text : { from : string, status : string, lastUpdate : Timestamp, data : string, color : string, uName : string };
  
  constructor() { }
  
  ngOnInit() {}
  
}

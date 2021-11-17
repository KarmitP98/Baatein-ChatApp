import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {

  @Input() class: string = '';
  @Input() type: string = 'tail-spin';
  @Input() fill: string = '';
  @Input() stroke: string = '';
  
  constructor() { }

  ngOnInit() {}

}

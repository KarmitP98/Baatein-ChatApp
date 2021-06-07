import { Component, Input, OnInit } from '@angular/core';

@Component( {
                selector: 'app-chat',
                templateUrl: './chat.component.html',
                styleUrls: [ './chat.component.scss' ],
            } )
export class ChatComponent implements OnInit {
    
    @Input() data: { avatar: string, name: string, message: string, id: number, lastMessageDate: Date };
    
    constructor() { }
    
    ngOnInit() {
    }
    
}

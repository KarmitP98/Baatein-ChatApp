import { Component, OnInit } from '@angular/core';
import SAMPLE_CHATS from '../../constants/chats';

@Component( {
                selector: 'app-chats',
                templateUrl: './chats.component.html',
                styleUrls: [ './chats.component.scss' ],
            } )
export class ChatsComponent implements OnInit {
    
    chats: { avatar: string, name: string, message: string, id: number, lastMessageDate: Date }[] = SAMPLE_CHATS;
    
    constructor() { }
    
    ngOnInit() {
    }
    
}

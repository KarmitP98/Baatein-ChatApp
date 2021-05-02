import { Component, OnInit } from '@angular/core';

@Component( {
                selector: 'app-chats',
                templateUrl: './chats.component.html',
                styleUrls: [ './chats.component.scss' ],
            } )
export class ChatsComponent implements OnInit {
    
    chats: { imageUrl: string, title: string, text: string }[] = [];
    
    constructor() { }
    
    async ngOnInit() {
        const photos: { url, title, thumbnailUrl }[] = await fetch( `https://jsonplaceholder.typicode.com/photos?_limit=10` )
            .then( response => response.json() );
        
        for (let { url, title, thumbnailUrl } of photos) {
            this.chats.push( { title: 'Some Title', text: url, imageUrl: thumbnailUrl } );
        }
    }
    
}

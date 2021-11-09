import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import ChatModel from "../models/ChatModel";

@Injectable( {
                 providedIn : "root"
             } )
export class ChatService {
    
    private chatCollection = this.afs.collection<ChatModel>( "chats" );
    
    constructor( private afs : AngularFirestore ) { }
    
    createNewChat = ( chat : ChatModel ) => {
        return new Promise( async ( resolve, reject ) => {
            await this.chatCollection.doc( chat.cId ).set( { ...chat } )
                      .then( () => {
                          resolve( true );
                      } )
                      .catch( error => {
                          reject( error );
                      } );
        } );
    };
    
    updateChat = ( chat : ChatModel ) => {
        return new Promise( async ( resolve, reject ) => {
            await this.chatCollection.doc( chat.cId ).update( { ...chat } )
                      .then( () => {
                          resolve( true );
                      } )
                      .catch( error => {
                          reject( error );
                      } );
        } );
    };
    
    deleteChat = ( chat : ChatModel | string ) => {
        const cId = typeof chat === "string" ? chat : chat.cId;
        
        return new Promise( async ( resolve, reject ) => {
            await this.chatCollection.doc( cId ).delete()
                      .then( () => {
                          resolve( true );
                      } )
                      .catch( error => {
                          reject( error );
                      } );
        } );
    };
    
    fetchAllChats = () => {
        return this.chatCollection;
    };
    
    fetchChatBetween = ( currentUser : string, otherUser : string ) => {
        return this.chatCollection.ref.where( "betweenIds", "array-contains", [ currentUser, otherUser ] ).limit( 1 );
    };
    
}

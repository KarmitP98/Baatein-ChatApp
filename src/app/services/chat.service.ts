import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import ChatModel from "../models/ChatModel";

@Injectable( {
                 providedIn : "root"
             } )
export class ChatService {
    
    private chatCollection = this.afs.collection<ChatModel>( "chats" );
    
    constructor( private afs : AngularFirestore ) { }
    
    /**
     * Create a new chat
     * @param chat
     */
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
    
    /**
     * Update the chat
     * @param chat
     */
    updateChat = ( chat : ChatModel ) => {
        return new Promise( async ( resolve, reject ) => {
            await this.chatCollection.doc( chat.cId ).update( { ...chat, updatedAt : new Date() } )
                      .then( () => {
                          resolve( true );
                      } )
                      .catch( error => {
                          reject( error );
                      } );
        } );
    };
    
    /**
     * Delete the provided chat from the collection
     * @param chat
     */
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
    
    /**
     * Fetch all chats in the database
     */
    fetchAllChats = () => {
        return this.chatCollection.ref.orderBy( "updatedAt" );
    };
    
    /**
     * Fetch chats that match the attributes and conditions
     * @param attribute
     * @param condition
     * @param value
     */
    fetchChatByAttribute = ( attribute, condition : "<" | "<=" | "==" | "!=" | ">=" | ">" | "array-contains" | "in" | "array-contains-any" | "not-in", value : any ) => {
        if ( attribute && condition && value ) {
            return this.chatCollection.ref.where( attribute, condition, value ).orderBy( "updatedAt" );
        }
        return undefined;
    };
    
    /**
     * Fetch chat between the 2 provided users.
     * @issue Partially works, needs fixing.
     * @param currentUser
     * @param otherUser
     */
    fetchChatBetween = ( currentUser : string, otherUser : string ) => {
        return this.chatCollection.ref.where( "betweenIds", "array-contains-any", [ currentUser, otherUser ] ).orderBy( "updatedAt" );
    };
    
}

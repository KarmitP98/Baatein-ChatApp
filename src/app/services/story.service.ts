import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { StoryModel } from "../models/StoryModel";

@Injectable( {
                 providedIn : "root"
             } )
export class StoryService {
    
    private storyCollection = this.afs.collection<StoryModel>( "stories" );
    
    constructor( private afs : AngularFirestore ) { }
    
    createStory = ( story : StoryModel ) => {
        return new Promise( ( resolve, reject ) => {
            this.storyCollection.doc( story.id ).set( { ...story } ).then( ( value ) => {
                resolve( value );
            } )
                .catch( error => {
                    reject( error );
                } );
        } );
    };
    
    updateStory = ( story : StoryModel ) => {
        return new Promise( ( resolve, reject ) => {
            this.storyCollection.doc( story.id ).update( { ...story } ).then( ( value ) => {
                resolve( value );
            } )
                .catch( error => {
                    reject( error );
                } );
        } );
    };
    
    deleteStory = ( story : StoryModel | string ) => {
        return new Promise( ( resolve, reject ) => {
            this.storyCollection.doc( typeof story === "string" ? story : story.id ).delete().then( ( value ) => {
                resolve( value );
            } )
                .catch( error => {
                    reject( error );
                } );
        } );
    };
    
    fetchAllStories = () => {
        return this.storyCollection;
    };
    
    fetchStoryWithAttribute = ( attribute, condition, value ) => {
        return this.storyCollection.ref.where( attribute, condition, value );
    };
    
    fetchStoryForUserId = ( id : string ) => {
        return this.fetchStoryWithAttribute( "createdById", "==", id );
    };
    
    fetchTodayStories = ( date : Date ) => {
        return this.fetchStoryWithAttribute( "createdAt", "==", date );
    };
}

import { UserModel } from "../models/UserModel";
import ChatModel, { ChatType } from "../models/ChatModel";
import { AngularFirestore as store } from "@angular/fire/compat/firestore";

export const addToLocal = async ( key, value ) => {
    return new Promise( async resolve => {
        await localStorage.setItem( key, JSON.stringify( value ) );
        resolve( true );
    } );
};


export const startANewConversation = ( currentUser : UserModel, otherUser : UserModel ) => {
    return new ChatModel( [ getUserReference( currentUser.uId ), getUserReference( otherUser.uId ) ],
                                            [ currentUser.uId, otherUser.uId ], [], new Date(), ChatType.user );
};

export const getUserReference = ( uId : string ) => {
    return store.prototype.collection( "users" ).doc( uId ).ref;
};

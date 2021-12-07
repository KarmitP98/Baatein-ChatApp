import { UserModel } from "../models/UserModel";
import ChatModel, { ChatType, MessageStatus } from "../models/ChatModel";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

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
    return `users/${ uId }`;
};


export const TimeStampToDate = ( stamp : Timestamp ) => {
    if ( stamp ) {
        return stamp.toDate();
    }
    return undefined;
};


export const getStatusIcon = ( status ) => {
    switch ( status ) {
        case MessageStatus.sent:
            return "assets/sent-light.svg";
        case MessageStatus.seen:
            return "assets/read-light.svg";
        default:
            return undefined;
    }
};

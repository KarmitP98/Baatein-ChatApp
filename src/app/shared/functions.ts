import { UserModel } from "../models/UserModel";
import ChatModel, { ChatType, MessageStatus } from "../models/ChatModel";
import firebase from "firebase/compat";
import { Reference } from "@angular/fire/compat/firestore";
import User = firebase.User;

export const addToLocal = async ( key, value ) => {
    return new Promise( async resolve => {
        await localStorage.setItem( key, JSON.stringify( value ) );
        resolve( true );
    } );
};


export const startANewConversation = ( currentUser : UserModel, otherUser : UserModel, currentUserRef : Reference<User>, otherUserRef : Reference<UserModel> ) => {
    return new ChatModel( [ currentUserRef, otherUserRef ], [ currentUser.uId, otherUser.uId ], [], new Date(), ChatType.user );
};

export const getUserReference = ( uId : string ) => {
    return `users/${ uId }`;
};


export const TimeStampToDate = ( stamp ) => {
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


export const getAvatarLocation = ( fileName : string ) => {
    return `assets/Avatars/${ fileName }`;
};


export const encodeBase64 = ( data : string, type : string ) => {
    return `data:image/${ type };base64,${ data }`;
};

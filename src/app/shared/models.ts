import Timestamp = firebase.firestore.Timestamp;
import * as firebase from "firebase";

export class UserModel {
    public uId : string;
    public uEmail : string;
    public uName : string;
    public uPhone? : string;
    public uProPic? : string;
    public onlineStatus? : string;
    public blockList? : string[];
    public ghostMode? : boolean;
    public secLevel? : number;
}

export class ChatModel {
    public chatId : string;
    public userIds : string[];
    public texts : TextModel[];
    public users : UserModel[];
    public status : string;
}

export class TextModel {
    public to : string;
    public from : string;
    public data : any;
    public sentTime : Timestamp;
    public status : string;
    public lastUpdateTime : Timestamp;
    public deleted : boolean;
}

import { Reference } from "@angular/fire/compat/firestore";
import { UserModel } from "./UserModel";

export enum MessageType {
    text,
    file,
    image,
    video,
    html
}

export enum ChatStatus {
    deleted,
    archived,
    live
}

export enum MessageStatus {
    unsent,
    error,
    sent,
    seen
}

export enum ChatType {
    user,
    group,
}

export class MessageModel {
    public time : Date;
    public lastUpdatedAt : Date;
    public to : Reference<UserModel>;
    public from : Reference<UserModel>;
    public toId : string;
    public fromId : string;
    public type : MessageType;
    public cId : string;
    public status : MessageStatus;
    public createdAt : Date;
    public updatedAt : Date;
    public text: string;
}

export default class ChatModel {
    public cId : string;
    public between : Reference<UserModel>[];
    public betweenIds : string[];
    public messages : MessageModel[];
    public name : string;
    public status : ChatStatus;
    public createdAt : Date;
    public updatedAt : Date;
    public type: ChatType
}

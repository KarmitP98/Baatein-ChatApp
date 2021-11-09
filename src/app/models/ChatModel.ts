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

export class MessageModel {
    private time : Date;
    private lastUpdatedAt : Date;
    private to : Reference<UserModel>;
    private from : Reference<UserModel>;
    private toId : string;
    private fromId : string;
    private type : MessageType;
    private cId : string;
    
    constructor( time : Date, lastUpdatedAt : Date, to : Reference<UserModel>, from : Reference<UserModel>, toId : string, fromId : string, type : MessageType, cId : string ) {
        this.time = time;
        this.lastUpdatedAt = lastUpdatedAt;
        this.to = to;
        this.from = from;
        this.toId = toId;
        this.fromId = fromId;
        this.type = type;
        this.cId = cId;
    }
    
    
    getTime() : Date {
        return this.time;
    }
    
    setTime( value : Date ) {
        this.time = value;
    }
    
    getLastUpdatedAt() : Date {
        return this.lastUpdatedAt;
    }
    
    setLastUpdatedAt( value : Date ) {
        this.lastUpdatedAt = value;
    }
    
    getTo() : Reference<UserModel> {
        return this.to;
    }
    
    setTo( value : Reference<UserModel> ) {
        this.to = value;
    }
    
    getFrom() : Reference<UserModel> {
        return this.from;
    }
    
    setFrom( value : Reference<UserModel> ) {
        this.from = value;
    }
    
    getToId() : string {
        return this.toId;
    }
    
    setToId( value : string ) {
        this.toId = value;
    }
    
    getFromId() : string {
        return this.fromId;
    }
    
    setFromId( value : string ) {
        this.fromId = value;
    }
    
    getType() : MessageType {
        return this.type;
    }
    
    setType( value : MessageType ) {
        this.type = value;
    }
    
    getCId() : string {
        return this.cId;
    }
    
    setCId( value : string ) {
        this.cId = value;
    }
}

export default class ChatModel {
    private cId : string;
    private between : Reference<UserModel>[];
    private betweenIds : string[];
    private messages : MessageModel[];
    private name : string;
    private status : ChatStatus;
    
    constructor( cId : string, between : Reference<UserModel>[], betweenIds : string[], messages : MessageModel[] ) {
        this.cId = cId;
        this.between = between;
        this.betweenIds = betweenIds;
        this.messages = messages;
    }
    
    getCId() : string {
        return this.cId;
    }
    
    setCId( value : string ) {
        this.cId = value;
    }
    
    getBetween() : Reference<UserModel>[] {
        return this.between;
    }
    
    setBetween( value : Reference<UserModel>[] ) {
        this.between = value;
    }
    
    getBetweenIds() : string[] {
        return this.betweenIds;
    }
    
    setBetweenIds( value : string[] ) {
        this.betweenIds = value;
    }
    
    getMessages() : MessageModel[] {
        return this.messages;
    }
    
    setMessages( value : MessageModel[] ) {
        this.messages = value;
    }
    
    
    getName() : string {
        return this.name;
    }
    
    setName( value : string ) {
        this.name = value;
    }
    
    
    getStatus() : ChatStatus {
        return this.status;
    }
    
    setStatus( value : ChatStatus ) {
        this.status = value;
    }
}

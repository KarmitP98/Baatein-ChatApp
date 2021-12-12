import firebase from "firebase/compat";
import Reference = firebase.database.Reference;

export class StoryModel {
    id : string;
    createdAt : Date;
    updatedAt : Date;
    createdBy : Reference;
    updateBy : Reference;
    createdById : string;
    updatedById : string;
    showUntil : Date;
    file : File;
    fileURL : string;
    
    
    constructor( id : string, createdAt : Date, createdBy : firebase.database.Reference, createdById : string, file : File ) {
        this.id = id;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.createdById = createdById;
        this.file = file;
    }
}

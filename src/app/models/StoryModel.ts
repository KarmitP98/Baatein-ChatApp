export class StoryModel {
    id : string;
    createdAt : Date;
    updatedAt : Date;
    createdBy : any;
    updateBy : any;
    createdById : string;
    updatedById : string;
    showUntil : Date;
    file : File;
    fileURL : string;
    
    
    constructor( id : string, createdAt : Date, createdBy : any, createdById : string, fileURL : string ) {
        this.id = id;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.createdById = createdById;
        this.fileURL = fileURL;
    }
}

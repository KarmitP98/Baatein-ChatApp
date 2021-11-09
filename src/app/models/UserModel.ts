export enum StatusModel {
    offline,
    online
}

export enum Theme {
    light = "light", dark = "dark"
}

export class UserModel {
    private uId : string;
    private name : string;
    private email : string;
    private password : string;
    private profilePic : string;
    private dob : Date;
    private tofd : string;
    private status : StatusModel;
    private lastSeen : Date;
    private ghostMode : boolean;
    private theme : Theme;
    
    constructor( uId : string, name : string, email : string, password : string, profilePic : string, dob : Date, tofd : string, status : StatusModel, lastSeen : Date, ghostMode : boolean ) {
        this.uId = uId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.profilePic = profilePic;
        this.dob = dob;
        this.tofd = tofd;
        this.status = status;
        this.lastSeen = lastSeen;
        this.ghostMode = ghostMode;
    }
    
    getUId() : string {
        return this.uId;
    }
    
    setUId( value : string ) {
        this.uId = value;
    }
    
    getName() : string {
        return this.name;
    }
    
    setName( value : string ) {
        this.name = value;
    }
    
    getEmail() : string {
        return this.email;
    }
    
    setEmail( value : string ) {
        this.email = value;
    }
    
    getPassword() : string {
        return this.password;
    }
    
    setPassword( value : string ) {
        this.password = value;
    }
    
    getProfilePic() : string {
        return this.profilePic;
    }
    
    setProfilePic( value : string ) {
        this.profilePic = value;
    }
    
    getDob() : Date {
        return this.dob;
    }
    
    setDob( value : Date ) {
        this.dob = value;
    }
    
    getTofd() : string {
        return this.tofd;
    }
    
    setTofd( value : string ) {
        this.tofd = value;
    }
    
    getStatus() : StatusModel {
        return this.status;
    }
    
    setStatus( value : StatusModel ) {
        this.status = value;
    }
    
    getLastSeen() : Date {
        return this.lastSeen;
    }
    
    setLastSeen( value : Date ) {
        this.lastSeen = value;
    }
    
    getGhostMode() : boolean {
        return this.ghostMode;
    }
    
    setGhostMode( value : boolean ) {
        this.ghostMode = value;
    }
}

import { getAvatarLocation } from "./functions";

export const UID = "ureqid";

export const HOME_PAGE_URL : string[] = [ "/", "tabs", "home" ];

export const includes = ( str : string, subStr : string ) => {
    return sanitize( str ).includes( sanitize( subStr ) );
};

export const sanitize = ( value : string ) => {
    return value?.toLowerCase()?.trim();
};


export const ALL_AVATARS = [
    getAvatarLocation( "andy.jpg" ),
    getAvatarLocation( "angela.jpg" ),
    getAvatarLocation( "creed.jpg" ),
    getAvatarLocation( "darryl.png" ),
    getAvatarLocation( "dwight.jpg" ),
    getAvatarLocation( "jim.png" ),
    getAvatarLocation( "kelly.jpg" ),
    getAvatarLocation( "kevin.png" ),
    getAvatarLocation( "micheal.png" ),
    getAvatarLocation( "oscar.jpg" ),
    getAvatarLocation( "pam.jpg" ),
    getAvatarLocation( "phyllis.jpg" ),
    getAvatarLocation( "ryan.png" ),
    getAvatarLocation( "stanley.jpg" ),
    getAvatarLocation( "toby.jpg" )
];

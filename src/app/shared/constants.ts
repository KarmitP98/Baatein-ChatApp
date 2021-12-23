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
    getAvatarLocation( "andy.png" ),
    getAvatarLocation( "angela.png" ),
    getAvatarLocation( "creed.png" ),
    getAvatarLocation( "darryl.png" ),
    getAvatarLocation( "dwight.png" ),
    getAvatarLocation( "jim.png" ),
    getAvatarLocation( "kelly.png" ),
    getAvatarLocation( "kevin.png" ),
    getAvatarLocation( "micheal.png" ),
    getAvatarLocation( "oscar.png" ),
    getAvatarLocation( "pam.png" ),
    getAvatarLocation( "phyllis.png" ),
    getAvatarLocation( "ryan.png" ),
    getAvatarLocation( "stanley.png" ),
    getAvatarLocation( "toby.png" )
];


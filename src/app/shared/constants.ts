export const UID = "ureqid";

export const HOME_PAGE_URL : string[] = [ "/", "tabs", "home" ];

export const includes = ( str : string, subStr : string ) => {
    return sanitize( str ).includes( sanitize(subStr) );
};

export const sanitize = ( value : string ) => {
    return value?.toLowerCase()?.trim();
};

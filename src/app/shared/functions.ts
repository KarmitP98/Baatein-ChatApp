export const addToLocal = async ( key, value ) => {
    return new Promise( async resolve => {
        await localStorage.setItem( key, JSON.stringify( value ) );
        resolve( true );
    } );
};

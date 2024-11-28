const say = require( 'say' );


module.exports = {
    speakNT: ( dir, pos, atm ) => {
        say.speak(`${ dir }, ${ pos } contracts, ${ atm }`,
            null, null, ( err ) => {
                if ( err ) {
                    console.error( err );
                    return;
                }
                console.log( 'NinjaTrader order announced' );
        } );
    }
};

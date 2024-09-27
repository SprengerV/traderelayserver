const fs = require( 'fs' );
const path = require( 'path' );

const sf = path.join( __dirname, '..', 'config', 'state.json' );
const fresh = {
    "account": {
        "position_size": 0,
        "active_atm": null
    }
};

const initState = () => {
    if ( ! fs.existsSync( sf ) ) {
        fs.writeFileSync( sf, JSON.stringify( fresh, null, 2 ) )
    }
};

const getState = () => {
    initState();
    const state = JSON.parse( fs.readFileSync( sf ) );
    if ( state ) state
    else null
};

const setState = ( obj ) => {
    fs.writeFileSync( sf, JSON.stringify( obj, null, 2 ) );
};

module.exports = {
    getState,
    setState
};
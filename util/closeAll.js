const path = require( 'path' );
const { addoif } = require( path.join( __dirname, '..', 'controllers', 'addoif.js' ) );
const time = require( path.join( __dirname, 'time.js' ) );
const { getState } = require( path.join( __dirname, 'state.js' ) );

const closeAll = () => {
    const state = getState();
    const accts = Object.keys(state);

    console.log( `${ time() } CLOSING ALL TRADES!`)

    for ( i=0; i<accts.length; i++ ) {
        const acctk = accts[ i ];
        const acct = state[ acctk ];
        const ticks = Object.keys( acct );
        for ( j=0; j<ticks.length; j++ ) {
            let no = {};
            no.account = accts[ i ]; 
            no.ticker = ticks[ j ];
            setTimeout( () => {
                addoif( no )
            }, 500);
        };
    };
};

module.exports = closeAll;
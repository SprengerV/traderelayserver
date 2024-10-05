const app = require( 'express' );
const path = require( 'path' );
const time = require( path.join( __dirname, '..', 'util', 'time.js' ) )
const { getState } = require( path.join( __dirname, '..', 'util', 'state.js' ) )
const { addoif } = require( path.join( __dirname, '..', 'controllers', 'addoif.js' ) )
const { contracts } = require( path.join( __dirname, '..', 'util', 'contracts.js' ) );

const router = app.Router();

router.post( '/', ( req, res, next ) => {
    const { body } = req;
    let { strategy, data } = body;
    let { position_size: _newp, contracts: _contracts } = data;
    const contracts = parseInt( _contracts );
    const newp = parseInt( _newp );
    const state = getState();
    const accts = Object.keys( state );
    let acct;
    let oldp;

    if ( accts.includes( strategy.account ) ) {
        acct = state[ strategy.account ];
        const ticks = Object.keys( acct );
        const ticker = contracts[ strategy.ticker ];

        if ( ticks.includes( ticker ) ) {
            const { position_size: _oldp, active_atm } = acct[ ticker ];
            oldp = parseInt( _oldp );    
        } else {
            oldp = 0
        }
    } else {
        oldp = 0
    }

    console.log( `${ time() } strategy: ${ JSON.stringify( strategy, null, 2 ) }\ndata: ${ JSON.stringify( data, null, 2 ) }` );
    console.log(`${ time() } OLD POSITION: ${ oldp }, NEW POSITION: ${ newp }` );

    if ( ( oldp < 0 && newp > 0 ) || ( oldp > 0 && newp < 0 ) ) {
        addoif( strategy );
        data[ "contracts" ] = ( newp > 0 ? newp : ( -1 * newp ) ).toString();
        addoif( strategy, data )
        res.end( "200" );
    } else  if ( oldp == 0 ) {
        addoif( strategy, data );
        res.end( "200" );
    };
} );

module.exports = router;
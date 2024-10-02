const app = require( 'express' );
const path = require( 'path' );
const time = require( path.join( __dirname, '..', 'util', 'time.js' ) )
const { getState } = require( path.join( __dirname, '..', 'util', 'state.js' ) )
const { addoif } = require( path.join( __dirname, '..', 'controllers', 'addoif.js' ) )

const router = app.Router();

router.post( '/', ( req, res, next ) => {
    const { body } = req;
    let { strategy, data } = body;
    let { position_size: _newp, contracts: _contracts } = data;
    const contracts = parseInt( _contracts );
    const newp = parseInt( _newp );
    const { position_size: _oldp, active_atm } = getState()[ strategy.account ];
    const oldp = parseInt( _oldp );

    console.log( `${ time() } strategy: ${ JSON.stringify( strategy, null, 2 ) }\ndata: ${ JSON.stringify( data, null, 2 ) }` );
    
    if ( ( oldp < 0 && newp > 0 ) || ( oldp > 0 && newp < 0 ) ) {
        addoif( strategy );
        console.log(`NEW POSITION: ${ newp }`);
        data[ "contracts" ] = ( newp > 0 ? newp : ( -1 * newp ) ).toString();
        addoif( strategy, data )
        res.end( "200" );
    } else {
        addoif( strategy, data );
        res.end( "200" );
    };
} );

module.exports = router;
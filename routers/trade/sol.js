const app = require( 'express' );
const path = require( 'path' );
const { time } = require( path.join( __dirname, '..', '..', 'util', 'time.js' ) )
const { getState } = require( path.join( __dirname, '..', '..', 'util', 'state.js' ) )
const { addoif } = require( path.join( __dirname, '..', '..', 'controllers', 'addoif.js' ) )
const { contracts: contracts_obj } = require( path.join( __dirname, '..', '..', 'util', 'contracts.js' ) );

const router = app.Router()

router.post( '/', ( ( req, res, next ) => {
    const { body } = req
    const { data, strategy } = body
} ) )

module.exports = router
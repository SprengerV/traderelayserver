const path = require( 'path' );
const { currentContract } = require( path.join( __dirname, 'time.js' ) );

const contracts = {
    'SI1!': 'SI ' + currentContract()
};

const ks = Object.keys( contracts );

let contracts_inverse = {};

for ( i = 0; i < ks.length; i++) {
    key = ks[ i ];
    value = contracts[ key ];
    contracts_inverse[ value ] = key;
}

module.exports = {
    contracts,
    contracts_inverse
};
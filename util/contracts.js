const contracts = {
    'SI1!': 'SI 12-24'
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
const fs = require( 'fs' );
const path = require( 'path' );
const { time } = require( path.join( __dirname, '..', 'util', 'time.js' ) )
const { getState, setState } = require( path.join( __dirname, '..', 'util', 'state.js' ) )
const { contracts } = require( path.join( __dirname, '..', 'util', 'contracts.js' ) );
require( 'dotenv' ).config();

const dir = process.env.NINJA_DIRECTORY;
const delay = process.env.DELAY;
const win = process.env.WINDOW;
const tickers = Object.keys( contracts )

const addoif = ( strat, obj = { position_size: "0" } ) => {
    const state = parseInt( obj.position_size );
    const params = {
        'Command': '',
        'Account': '',
        'Instrument': '',
        'Action': '',
        'QTY': '',
        'Order Type': '',
        'Limit Price': '',
        'Stop Price': '',
        'TIF': '',
        'OCO ID': '',
        'Order ID': '',
        'Strategy': '',
        'Strategy ID': ''
    } 

    params[ 'Command' ] = ( state ? 'PLACE' : 'CLOSEPOSITION' );
    params[ 'Account' ] = strat.account
    params[ 'Instrument' ] = ( tickers.includes( strat.ticker ) ? contracts[ strat.ticker ] : '' )
    params[ 'Action' ] = ( state ? obj.order.toUpperCase() : '' );
    params[ 'Order Type' ] = ( state ? 'MARKET' : '' );
    params[ 'QTY' ] = ( state ? parseInt( obj.contracts ) : '' );
    params[ 'TIF' ] = ( state ? 'GTC' : ''  );
    params[ 'Strategy' ] = ( state ? obj.atm : '' );

    const keys = Object.keys( params );
    let paramstring = "";
    keys.forEach( ( v, i, arr ) => {
        paramstring += params[ v ] + ( i < arr.length -1 ? ";" :"" )
    } );

    const rand = ( state ? ( 1000 * delay + 1000 * win * Math.random() ) : 0 );
    console.log( `${ time() } RANDOMIZER: ${ rand / 1000 } seconds` )

    setTimeout( () => {
        try {
            const files = fs.readdirSync( dir );
            const { length } = files;
            const fname = `oif${ length.toString().padStart( 6, "0" ) }.txt`
            const dest = path.join( dir, fname );
            
            console.log( `${ time() } Parameters for new OIF: ${ paramstring }` );
            
            try {
                fs.writeFileSync( dest, paramstring );
                console.log( `${ time() } ${ dest } written!` );

                let gstate = getState();
                let ao = {};

                ao[ contracts[ strat.ticker ] ] = {
                    "position_size": parseInt( obj.position_size ),
                    "active_atm": (
                        state ? obj.atm : null
                    )
                };
                gstate[ strat.account ] = ao;

                setState( gstate );
            } catch ( er ) {
                console.log( `${ time() } ${ er }` );
            }
        } catch ( err ) {
            console.log( `${ time() } Error checking NinjaTrader disectory!\n${ err }` );
            return null
        }
    }, rand );
};

module.exports = { addoif };
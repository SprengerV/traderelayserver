const time = () => {
    const now = new Date();

    const _time = now.toLocaleString( 'en-US', {
        // month: '2-digit',
        // day: '2-digit',
        // year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    } ) + ' -';

    return _time;
};

const currentContract = () => {
    const now = new Date();

    const my = now.toLocaleString( 'en-US', {
        month: '2-digit',
        year: '2-digit'
    } ).split( '/' );

    const nm = parseInt( my[ 0 ] ) + 2;
    const yc = nm > 15;

    my[ 0 ] = yc ? nm - 12 : ( nm > 12 ? 12 : nm );
    my[ 1 ] = yc ? parseInt( my[ 1 ] ) + 1 : my[ 1 ];

    return my.join( '-' );
};

module.exports = { 
    time,
    currentContract
};
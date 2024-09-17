const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dir = process.env.NINJA_DIRECTORY;
const delay = process.env.DELAY;
const win = process.env.WINDOW;
const contracts = {
    // 'SI1!': 'COMEX:SI 12-24'
    'SI1!': 'SI 12-24'
};
const tickers = Object.keys(contracts)

const addoif = (obj, strat) => {
    const state = parseInt(obj.position_size);
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

    params['Command'] = (state ? 'PLACE' : 'CLOSEPOSITION');
    params['Account'] = strat.account
    params['Instrument'] = (tickers.includes(obj.ticker) ? contracts[obj.ticker] : '')
    params['Action'] = (state ? obj.order.toUpperCase() : '');
    params['Order Type'] = (state ? 'MARKET' : '');
    params['QTY'] = (state ? parseInt(obj.contracts) : '');
    params['TIF'] = (state ? 'GTC' : '');
    params['Strategy'] = (state ? obj.atm : '');

    const keys = Object.keys(params);
    let paramstring = "";
    keys.forEach((v, i, arr) => {
        paramstring += params[v] + (i < arr.length -1 ? ";" :"")
    });

    fs.readdir(dir,(err, files) => {
        if (err) {
            console.log(`Error checking NinjaTrader disectory!\n${err}`);
            return null
        }
        const { length } = files;
        const rand = (state ? (1000 * delay + 1000 * win * Math.random()) : 0);
        console.log(`RANDOMIZER: ${ rand / 1000 } seconds`)
        setTimeout(() => {
            const fname = `oif${length}.txt`
            const dest = path.join(dir, fname);
            console.log(`Parameters for new OIF: ${paramstring}`);
            fs.writeFile(dest, paramstring, (err) => {
                if (err) console.log(err);
                else console.log(`${dest} written!`);
            });
        }, rand);
    });
};

module.exports = { addoif };
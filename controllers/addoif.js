const fs = require('fs');
const path = require('path');
require('dotenv').config();

const acct = process.env.NINJA_ACCOUNT;
const dir = process.env.NINJA_DIRECTORY;
const delay = process.env.DELAY;
const win = process.env.WINDOW;
const contracts = {
    'SI1!': 'COMEX:SI 12-24'
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
    keys.forEach((v, i) => {
        paramstring += params[v] + ";"
    });

    fs.readdir(dir,(err, files) => {
        if (err) {
            console.log(err);
            return null
        }
        const { length } = files;
        const rand = (state ? (1000 * delay + 1000 * win * Math.random()) : 0);
        console.log(`RANDOMIZER: ${ rand / 1000 } seconds`)
        setTimeout(() => {
            fs.writeFile(path.join(dir, `oif${length}.txt`), paramstring, () => {
                console.log(`${dir}OIF${length}.txt written`);
            });
        }, rand);
    });
};

module.exports = { addoif };
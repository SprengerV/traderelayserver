const fs = require('fs');
const path = require('path');
require('dotenv').config();

const acct = process.env.NINJA_ACCOUNT;
const strat = process.env.ATM_STRAT;
const dir = process.env.NINJA_DIRECTORY;
let state = 1;
const contracts = {
    'SI1!': 'COMEX:SI 12-24'
};
const tickers = Object.keys(contracts)

const addoif = (obj) => {
    const params = {
        'Command': '',
        'Account': acct,
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
    params['Instrument'] = (tickers.includes(obj.ticker) ? contracts[obj.ticker] : '')
    params['Action'] = (state ? obj.order.toUpperCase() : '');
    params['Order Type'] = (state ? 'MARKET' : '');
    params['QTY'] = (state ? parseInt(obj.contracts) : '');
    params['TIF'] = (state ? 'GTC' : '');
    params['Strategy'] = (state ? strat : '');

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
        fs.writeFile(path.join(dir, `OIF${length}.txt`), paramstring, () => {
            console.log(`${dir}OIF${length}.txt written`);
            state = length % 2;
        });
    });
};

module.exports = { addoif };
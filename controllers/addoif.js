const fs = require('fs');
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
        'Command': null,
        'Account': acct,
        'Instrument': null,
        'Action': null,
        'QTY': null,
        'Order Type': 'MARKET',
        'Limit Price': null,
        'Stop Price': null,
        'TIF': null,
        'OCO ID': null,
        'Order ID': null,
        'Strategy': null,
        'Strategy ID': null
    } 

    params['Command'] = (state ? "PLACE" : "CLOSEPOSITION");
    params['Instrument'] = (tickers.includes(obj.ticker) ? contracts[obj.ticker] : null)
    params['Action'] = (state ? obj.order.toUpperCase() : null);
    params['QTY'] = (state ? parseInt(obj.contracts) : null);
    params['TIF'] = (state ? "GTC" : null);
    params['Strategy'] = (state ? strat : null);

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
        fs.writeFile(path.join(dir, `OIF${files.length}.txt`), paramstring, () => {
            console.log(`${dir}OIF${files.length}.txt written`);
            state = files.length % 2;
        });
    });
};

module.exports = { addoif };
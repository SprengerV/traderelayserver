const express = require('express');
const path = require('path');
const time = require(path.join(__dirname, 'util', 'time.js'))
const bodyParser = require('body-parser');
const trade = require(path.join(__dirname, 'routers', 'trade.js'))
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.get('/', (req, res) => {
    res.send(`${time} Mind your business.`);
});

app.use(bodyParser.json());
app.use('/trade', trade);

app.listen(PORT, () => {
    console.log(`${time()} Server listening on PORT ${PORT} !`)
})

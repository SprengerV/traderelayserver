const express = require('express');
const path = require('path');
const trade = require(path.join(__dirname, 'routers', 'trade.js'))
require('dotenv').config();

const PORT = process.env.PORT;
const nd = process.env.NINJA_DIRECTORY;
const app = express();

app.get('/', (req, res) => {
    res.send('Mind your business.');
});

app.use('/trade', trade);

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT} !`)
})

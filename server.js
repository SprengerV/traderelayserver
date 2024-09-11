const express = require('express');
require('dotenv').configure();

const PORT = process.env.PORT;
const nd = process.env.NINJA_DIRECTORY;
const app = express();

app.get('/', (req, res) => {
    res.send('Mind your business.');
});

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT} !`)
})

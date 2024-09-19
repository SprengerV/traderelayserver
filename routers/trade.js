const app = require('express');
const path = require('path');
const { addoif } = require(path.join(__dirname, '..', 'controllers', 'addoif.js'))

const router = app.Router();

router.post('/', (req, res, next) => {
    const { body } = req;
    const { strategy, data } = body;
    console.log(`strategy: ${JSON.stringify(strategy, null,2)}\ndata: ${JSON.stringify(data, null, 2)}`);
    addoif(strategy, data);
    res.end("200");
})

module.exports = router;
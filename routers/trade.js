const app = require('express');
const path = require('path');
const { addoif } = require(path.join(__dirname, '..', 'controllers', 'addoif.js'))

const router = app.Router();

router.post('/', (req, res, next) => {
    const { body } = req;
    const { data, strategy } = body;
    console.log(`data: ${data}\nstrategy: ${strategy}`);
    addoif(data, strategy);
    res.end("200");
})

module.exports = router;
const app = require('express');
const path = require('path');
const { addoif } = require(path.join(__dirname, '..', 'controllers', 'addoif.js'))

const router = app.Router();

router.post('/', (req, res, next) => {
    const json = JSON.parse(res);
    const data = json.data.data;
    addoif(data);
})

module.exports = router;
const app = require( 'express' );
const path = require( 'path' );
const nt = require(path.join(__dirname, 'trade', 'nt.js'));
const sol = require(path.join(__dirname, 'trade', 'sol.js'))

const router = app.Router();

router.use('/nt', nt)
router.use('/sol', sol)

module.exports = router;
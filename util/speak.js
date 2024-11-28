const say = require('say');


module.exports = {
    speakNT: (dir, pos, atm) => {
        say.speak(`${dir}, ${pos} contracts, ${atm}`);
    }
};

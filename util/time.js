const now = new Date();

const time = now.toLocaleString('en-US', {
    // month: '2-digit',
    // day: '2-digit',
    // year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
}) + ' -';

module.exports = time;
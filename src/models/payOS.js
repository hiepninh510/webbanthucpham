const PayOS = require('@payos/node');


const payOS = new PayOS(
    process.env.CLIENT_ID,
    process.env.API_KEY,
    process.env.CHECKSUM_KEY
    );

module.exports = payOS;


const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.URLMoongoDB);
        console.log("Connect successfully!");
    } catch (error) {
        console.log("Connect fail");
        mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }
}

module.exports = { connect };

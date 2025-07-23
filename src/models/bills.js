const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Bill = new Schema({
    carts: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
    ttkh: [{ type: Schema.Types.ObjectId, ref: 'Login' }],
    sumPrice:{type:String},
    dayBought:{type:Date,default:Date.now},
    phone:{type:String},
    address:{type:String},

})

module.exports = mongoose.model('Bill',Bill);

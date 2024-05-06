const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Cart = new Schema({
    email:{type:String},
    name:{type:String},
    img:{type:String},
    price:{type:String},
    number:{type:Number},
    brand:{type:String},
    isDelete:{type:Boolean,default:false},
    bought:{type:Boolean,default:false},
});

module.exports = mongoose.model('Cart',Cart);
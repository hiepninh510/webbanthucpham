const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Login = new Schema({
    email:{type:String},
    pass:{type:String},
    userName:{type:String},
    birthday:{type:Date},
    address:{type:String},
    phone:{type:String},
    accessdate:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Login", Login);
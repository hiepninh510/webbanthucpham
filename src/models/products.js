const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
  name:{type:String},
  priceOld:{type:String},
  priceNew:{type:String},
  sold:{type:Number},
  brand:{type:String},
  producer:{type:String},
  img:{type:String},
  type:{type:String},
  isDelete:{type:Boolean,default:false},
});

module.exports = mongoose.model("Product", Product);
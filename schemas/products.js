const {ObjectId} = require("bson");
const { string } = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    sku:{
        type:String,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    make:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    vendor_id:{
        type:ObjectId,
        required:true
    }
});

const Product = mongoose.model('products',productSchema);

module.exports = Product;
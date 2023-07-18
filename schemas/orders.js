const {ObjectId} = require("bson");
const { string } = require("joi");
const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    orderID:{
        type:String,
        required:true,
    },
    notes:{
        type:String,
        required:true,
    },
    currency:{
        type:String,
        required:true,
    },
    totalAmount:{
        type:Number,
        required:true,
    },
    orderDate:
    {
        type:Date,
        required:true,
    },
    client_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required:true,
        }],
    shippingAddress:{
        type: Object,
        required:true,
        }
});

const Order = mongoose.model('orders',orderSchema);

module.exports = Order;
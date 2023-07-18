const {ObjectId} = require("bson");
const { string } = require("joi");
const mongoose = require("mongoose");
const Joi = require('joi');


const productSchema = new mongoose.Schema({
    amount:{
        type: Number,
        required: true, 
        min: 0
    },
    points:{
        type: Number,
        required: true, 
        min: 0
    },
    notes:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    expiry_date:{
        type:Date,
        required:true
    }
});

const LoyaltyPoints = mongoose.model('loyalty_points',productSchema);

module.exports = LoyaltyPoints;

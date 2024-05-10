const { ObjectId } = require("bson");
const Joi = require('joi');
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    user_id:{
        type:ObjectId,
        required:false,
    }
});

const Client = mongoose.model('clients',clientSchema);

module.exports = Client;
 
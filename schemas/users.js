const { Module } = require('module');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }
});

const User = mongoose.model('users',userSchema);


module.exports = User;
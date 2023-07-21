const { ObjectId } = require("bson");
const Joi = require('joi');
const mongoose = require("mongoose");

const episopesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
    },
    importantScenes:{
        type:Array,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    },
    season_id:{
        type:ObjectId,
        required:true,
    }
});

const Episode = mongoose.model('episopes',episopesSchema);

module.exports = Episode;
 
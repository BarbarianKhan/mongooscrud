const { ObjectId } = require("bson");
const Joi = require('joi');
const mongoose = require("mongoose");

const seasonSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
    },
    numberOfEpisodes:{
        type:Array,
        required:true,
    },
    genre:{
        type:String,
        required:true,
    }
});

const Season = mongoose.model('episopes',seasonSchema);

module.exports = Season;
 
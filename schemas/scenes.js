const { ObjectId } = require("bson");
const Joi = require('joi');
const mongoose = require("mongoose");

const sceneSchema = new mongoose.Schema({
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
    },
    season_id:{
        type:ObjectId,
        required:true,
    },
    episode_id:{
        type:ObjectId,
        required:true,
    }
});

const Scene = mongoose.model('scenes',sceneSchema);

module.exports = Scene;
 
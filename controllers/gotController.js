const User = require('../schemas/users');
const Client = require("../schemas/clients");
const Product = require("../schemas/products");
const Order = require("../schemas/orders");
const UserService = require('../services/user.service');
const Season = require('../schemas/seasons');
const multer = require("multer");

class GOTController {
    addSeason = async (req,res)=>{

    }
    getSeasons = async (req,res)=>{
        let data = await Season.find();
        res.send(data);
    }
    getAllStarks = async (req,res)=>{
        // let data = await User.findOne({$and:[{"name":"Muhammad Rehan Arshad"},{"email":"house_stark_1@gmasil.com"}]});
        // let data = await User.find({"age":{$gte:30}, $or:[{"name":"Muhammad Rehan Arshad"},{"email":"house_stark_22@gmail.com"},{"email":"house_stark_244@gmail.com"}]});
        // let data = await User.find({"age":{$not:{ $lte:30 }}});


        // #check name is aarray 
        // let data = await User.find({"age":{$nin:[30,32]}}).limit(5).skip(5).sort({"name":-1});
        let data = await User.createIndex({"name":1})

        res.send(data);
    }
}
module.exports= new GOTController();
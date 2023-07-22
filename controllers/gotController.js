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
        console.log(data);
        res.send(data);

    }
}
module.exports= new GOTController();
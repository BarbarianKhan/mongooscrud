const User = require('../schemas/users');
const Client = require("../schemas/clients");
const Product = require("../schemas/products");
const Order = require("../schemas/orders");
const multer = require("multer");

class UserService{
    createUser = async (req,res)=>{
        let data = new Client(req.body);
        let result = await data.save();
        return result;
    }
}



module.exports = new UserService();
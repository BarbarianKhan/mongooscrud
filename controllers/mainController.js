const User = require('../schemas/users');
const Client = require("../schemas/clients");
const Product = require("../schemas/products");
const Order = require("../schemas/orders");
const UserService = require('../services/user.service');
const multer = require("multer");

class MainController
{
    createUser = async (req,res) =>{
        try {
            let data = new User(req.body);
            let result = await data.save();
            res.send(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };

    createClient = async (req,res)=>{
        try {
            let result= UserService.createUser(req,res);
            res.send(result);

        } catch (error) {
            res.status(500).json({ error:error.errors });
        }
    };

    createProducts = async (req,res)=>{
        try {
                let data = new Product(req.body);
                let result = await data.save();
                res.send(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };

    createOrder = async (req,res)=>{
        try {
            let data = new Order(req.body);
            let result = await data.save();
            res.send(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };
    showOrder = async (req,res)=>{
        try {
            let result = await Order.findOne(req.params).exec();
            res.send(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };

    updateOrder = async (req,res)=>{
        try {
            let data =await Order.updateOne(
                req.params,
                {$set:req.body}
            );  
            res.send(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };

    usersList = async (req,res)=>{
        try {
            let data = await User.find();
            res.send(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };

    deleteUser = async (req,res)=>{
        try {
            let data = await User.deleteOne(req.params);
            res.send(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };

    updateUser = async (req,res)=>{
        try {
            let data =await User.updateOne(
                req.params,
                {$set:req.body}
            );  
            res.send(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };

    patchUser = async (req,res)=>{
        try {
            let data =await User.updateOne(
                req.params,
                {$set:req.body}
            );  
            res.send(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };
    updateAll = async (req,res)=>{
        try {
            let data =await User.updateMany([{$set:req.body}]);  
                res.send(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };
    search = async (req,res)=>{
        try {
            let data  = await User.find(
                {
                    "$or":[
                        {"name":{$regex:req.params.key, $options: 'i'}},
                        {"designation":{$regex:req.params.key, $options: 'i'}},
                        {"category":{$regex:req.params.key, $options: 'i'}},
                        {"category":{$regex:req.params.key, $options: 'i'}}
                    ]
                }
            );
            res.send(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };
}
module.exports= new MainController();
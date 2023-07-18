const User = require('../schemas/users');
const Client = require("../schemas/clients");
const Product = require("../schemas/products");
const Order = require("../schemas/orders");
const multer = require("multer");

const createUser = async (req,res) =>{
    try {
        let data = new User(req.body);
        let result = await data.save();
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};

const createClient = async (req,res)=>{
    try {
        let data = new Client(req.body);
        let result = await data.save();
        res.send(result);
    } catch (error) {
        res.status(500).json({ error:error.errors });
    }
};

const createProducts = async (req,res)=>{
    try {
            let data = new Product(req.body);
            let result = await data.save();
            res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};

const createOrder = async (req,res)=>{
    try {
        let data = new Order(req.body);
        let result = await data.save();
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};
const showOrder = async (req,res)=>{
    try {
        let result = await Order.findOne(req.params).exec();
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};

const updateOrder = async (req,res)=>{
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

const usersList = async (req,res)=>{
    try {
        let data = await User.find();
        res.send(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};

const deleteUser = async (req,res)=>{
    try {
        let data = await User.deleteOne(req.params);
        res.send(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};

const updateUser = async (req,res)=>{
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

const patchUser = async (req,res)=>{
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
const updateAll = async (req,res)=>{
    try {
        let data =await User.updateMany([{$set:req.body}]);  
            res.send(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};
const search = async (req,res)=>{
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

module.exports= {
    createUser,
    createClient,
    createProducts,
    createOrder,
    showOrder,
    usersList,
    updateOrder,
    updateOrder,
    updateUser,
    deleteUser,
    patchUser,
    updateAll,
    search
}
const User = require('../schemas/users');
const Client = require("../schemas/clients");
const Product = require("../schemas/products");
const Order = require("../schemas/orders");
const UserService = require('../services/user.service');
const multer = require("multer");
const transporter = require('../config/emailConfig');

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

    sendEmailUser = async (req,res)=>{
         
        const { to, subject, text } = req.body;

        // Email options
        const mailOptions = {
            from: 'your_email@example.com', // Your email address
            to: 'your_email@example.com',                         // Recipient's email address
            subject: 'Express Delivery Email subject',               // Email subject
            html: '<p>Text</p>',                     // Email content (text version)
            // You can also use `html` property to send an HTML-formatted email content
        };

        // Send the email
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            console.log('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
            } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
            }
        });
    };
}
module.exports= new MainController();
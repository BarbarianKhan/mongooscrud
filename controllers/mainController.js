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
            res.status(500).json({ error:error });
        }
    };

    createClient = async (req,res)=>{
        try {
            let data = new Client(req.body);
            let result = await data.save();

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
            res.status(500).json({ error: error });
        }
    };

    createOrder = async (req,res)=>{
        try {
            let data = new Order(req.body);
            let result = await data.save();
            res.send(result);
        } catch (error) {
            res.status(500).json({ error:error });
        }
    };
    showOrder = async (req,res)=>{
        try {
            let result = await Order.findOne(req.params).exec();
            res.send(result);
        } catch (error) {
            res.status(500).json({ error: error });
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
            res.status(500).json({ error: error });
        }
    };

    usersList = async (req,res)=>{
        try {
            let data = await User.find();
            res.send(data);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    };

    deleteUser = async (req,res)=>{
        try {
            let data = await User.deleteOne(req.params);
            res.send(data);
        } catch (error) {
            res.status(500).json({ error: error });
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
            res.status(500).json({ error: error });
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
            res.status(500).json({ error: error });
        }
    };
    updateAll = async (req,res)=>{
        try {
            let data =await User.updateMany([{$set:req.body}]);  
                res.send(data);
        } catch (error) {
            res.status(500).json({ error: error });
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
            res.status(500).json({ error: error });
        }
    };

    sendEmailUser = async (req,res)=>{
         
        const { to, subject, text } = req.body;

        // Email options
        const mailOptions = {
            from: 'my_email@example.com', // Your email address
            to: 'your_email@example.com',                         // Recipient's email address
            subject: 'Express Delivery Email subject',               // Email subject
            html: '<h1>A Quick Brownn Fox Jumps Over the Lazy Dog.</h1>',    // Email content (text version)
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
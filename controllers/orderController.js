const User = require('../schemas/users');
const Client = require("../schemas/clients");
const Product = require("../schemas/products");
const Order = require("../schemas/orders");
const loyaltyPoint = require("../schemas/loyalty");
const loyalPointValidator = require('../validations/loyalty-points-validations');
const multer = require("multer");

class OrderController{
    getAllOrders = async (req,res)=>{
        try {
            let ordersPipeLine = [];
            ordersPipeLine.push({
                $lookup:{
                    from:"clients",
                    localField:"client_id",
                    foreignField:"_id",
                    as:'clientDetails'
                }
            },
            {
            $lookup:
                    {
                    from: "products",
                    localField: "products",
                    foreignField: "_id",
                    as: "produtsList"
                }
            },
            {
                $addFields: {
                clientDetails: { $arrayElemAt: ["$clientDetails",0]}
                }
            });

            if(req.query.orderID)
            {
                ordersPipeLine.push({
                    $match:{ orderID:req.query.orderID }
                });
            }
            if(req.query.notes)
            {
                ordersPipeLine.push({
                    $match:{ notes:req.query.notes }
                });
            }
            if(req.query.name)
            {
                ordersPipeLine.push({
                    $match:{
                        "clientDetails.name": { $regex: req.query.name, $options: "i" } 
                        }
                    
                });
            }
            if(req.query.title)
            {
                ordersPipeLine.push({
                    $match:{
                        "produtsList": { 
                            $elemMatch:{
                                "title": { $regex: req.query.title, $options: "i" }
                                }
                            } 
                        }
                });
            }
            if(req.query.make)
            {
                ordersPipeLine.push({
                    $match:{
                        "produtsList": { 
                            $elemMatch:{
                                "make": { $regex: req.query.make , $options: "i" }
                                }
                            } 
                        }
                });
            }
            let data = await Order.aggregate([ordersPipeLine]);
            res.send(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };
    getagg = async (req,res)=>{
        try {
            let data = await Client.aggregate([{
                $lookup:{
                    from:"users",
                    localField:"user_id",
                    foreignField:"_id",
                    as:'user_details'
                }
            }]);
            res.send(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };
    getUserGroupByCat = async (req,res)=>{
        try {
            let data = await User.aggregate([
                {"$group":{_id:"$category",count:{$sum:1}  }}
            ]);
            res.send(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };
    getUserBybetween = async (req,res)=>{
        try {
            let data = await User.aggregate([
                {"$match":{age:{ $gt:18,$lte:25 }  }},
                {
                    $count: "TotalUsers"
                }
            ]);
            res.send(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };
    getUserByCat = async (req,res)=>{
        try {
            let data = await User.aggregate([
                {"$match":{category:req.params.category  }},
                {
                    $sort: { name: 1 }
                },
                { $skip: 1 },
                { $limit: 20 }
            ]);
            res.send(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };
    getClients = async (req,res)=>{
        try {
            let data = await User.aggregate([
                {
                    $lookup:{
                        from:'clients',
                        localField:"_id",
                        foreignField:"user_id",
                        as:"client"
                    }
                },
                {
                    "$unwind":"$client"
                },{
                    "$project": {
                        name : 1,
                        age : 1,
                        clientName:"$client.name",
                        clientAge : "$client.age",
                        clientCompany : "$client.company",
                        clientGenre : "$client.genre",
                        clientAddress : "$client.address"
                    }
                }
            ]);
            res.send(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get users' });
        }
    };

    FileUpload = multer({
                        storage:multer.diskStorage({
                            destination:function(req,file,cb){
                                cb(null,"uploads")
                            },
                            filename:function(req,file,cb){
                                cb(null,file.fieldname+"-"+Date.now()+".jpg");
                            }
                        })
                    }).single('user_file');

    addLoyaltyPoints = async (req,res)=>{
            try {
                let data = new loyaltyPoint(req.body);
                let result = await data.save();
                res.send(result);
            } catch (error) {
                res.status(500).json({ error:error.errors });
            }
    };

    updateShippingAddress  = async (req,res)=>{
        let result = await Order.updateOne(
                                        req.params,
                                        { $set: { 
                                            "shippingAddress.street": req.body.shippingAddress.street,
                                            "shippingAddress.city": req.body.shippingAddress.city,
                                            "shippingAddress.state": req.body.shippingAddress.state,
                                            "shippingAddress.country": req.body.shippingAddress.country,
                                            "shippingAddress.zip_code": req.body.shippingAddress.zip_code }}
                                    );
            res.send(result);
    }
}

module.exports = new OrderController();
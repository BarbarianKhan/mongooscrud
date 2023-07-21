const express = require('express');
const { json } = require('body-parser');
const routes = express.Router();
const User = require('./schemas/users');
const Client = require("./schemas/clients");
const Product = require("./schemas/products");
const Order = require("./schemas/orders");
const multer = require("multer");
const mainController = require('./controllers/mainController');
const orderController = require('./controllers/orderController');
const authController = require('./controllers/authController');
const validateData = require('./middlewares/validate');
const jwt = require("jsonwebtoken");
const authMiddleware = require('./middlewares/auth');

const loyalPointValidator = require('./validations/loyalty-points-validations');
const ClientValidation = require('./validations/clientValidations');
const ProductValidation = require('./validations/clientValidations');
const OrderValidation = require('./validations/clientValidations');
const UserValidation = require('./validations/clientValidations');
const loginValidation = require('./validations/loginValidation');

routes.post('/createUser',validateData(UserValidation),mainController.createUser);
routes.post('/createClient',validateData(ClientValidation),mainController.createClient);
routes.post('/createProducts',validateData(ProductValidation),mainController.createProducts);
routes.post('/createOrder',validateData(OrderValidation),mainController.createOrder);
routes.post('/addLoyaltyPoints',validateData(loyalPointValidator),orderController.addLoyaltyPoints);

routes.get('/showOrder/:orderID',mainController.showOrder);
routes.patch('/updateOrder/:orderID',mainController.updateOrder);
routes.get('/list',authMiddleware,mainController.usersList);
routes.delete('/deleteUser/:name',mainController.deleteUser);
routes.put('/updateUser/:name',mainController.updateUser);
routes.patch('/patchUser/:name',mainController.patchUser);
routes.put('/updateAll',mainController.updateAll);
routes.get('/search/:key',mainController.search);

routes.get('/getAllOrders',orderController.getAllOrders);
routes.get('/getagg',orderController.getagg);
routes.get('/getUserGroupByCat',orderController.getUserGroupByCat);
routes.get('/getUserBybetween', orderController.getUserBybetween);
routes.get('/getUserByCat/:category',orderController.getUserByCat);
routes.get('/getClients', orderController.getClients);
routes.post("/uploadFile",orderController.FileUpload,(req,res)=>{
    res.send("file uploaded");
});

routes.post('/login',validateData(loginValidation),authController.userLogin);
routes.post('/logout',authController.logout);

routes.get('/updateShippingAddress/:orderID',orderController.updateShippingAddress);

routes.get('/accessResource', (req, res)=>{  
    const token = req.headers.authorization.split(' ')[1]; 
    //Authorization: 'Bearer TOKEN'
    if(!token)
    {
        res.status(200).json({success:false, message: "Error! Token was not provided."});
    }
    //Decoding the token
    const decodedToken = jwt.verify(token,"secretkeyappearshere" );
    res.status(200).json({
                        success:true, 
                        data:{
                            userId:decodedToken.userId,
                            email:decodedToken
                        }}
                        );   
                    });
module.exports = routes; 
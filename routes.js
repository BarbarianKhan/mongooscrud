const express = require('express');
const routes = express.Router();
const MainController = require('./controllers/mainController');
const OrderController = require('./controllers/orderController');
const AuthController = require('./controllers/authController');
const validateData = require('./middlewares/validate');
const jwt = require("jsonwebtoken");
const authMiddleware = require('./middlewares/auth');
const GOTController = require('./controllers/gotController');

const loyalPointValidator = require('./validations/loyalty-points-validations');
const ClientValidation = require('./validations/clientValidations');
const ProductValidation = require('./validations/clientValidations');
const OrderValidation = require('./validations/clientValidations');
const UserValidation = require('./validations/clientValidations');
const loginValidation = require('./validations/loginValidation');

routes.post('/createUser',validateData(UserValidation),MainController.createUser);
routes.post('/createClient',validateData(ClientValidation),MainController.createClient);
routes.post('/createProducts',validateData(ProductValidation),MainController.createProducts);
routes.post('/createOrder',validateData(OrderValidation),MainController.createOrder);
routes.post('/addLoyaltyPoints',validateData(loyalPointValidator),OrderController.addLoyaltyPoints);

routes.get('/showOrder/:orderID',MainController.showOrder);
routes.patch('/updateOrder/:orderID',MainController.updateOrder);
routes.get('/list',authMiddleware,MainController.usersList);
routes.delete('/deleteUser/:name',MainController.deleteUser);
routes.put('/updateUser/:name',MainController.updateUser);
routes.patch('/patchUser/:name',MainController.patchUser);
routes.put('/updateAll',MainController.updateAll);
routes.get('/search/:key',MainController.search);

routes.get('/getAllOrders',OrderController.getAllOrders);
routes.get('/getagg',OrderController.getagg);
routes.get('/getUserGroupByCat',OrderController.getUserGroupByCat);
routes.get('/getUserBybetween', OrderController.getUserBybetween);
routes.get('/getUserByCat/:category',OrderController.getUserByCat);
routes.get('/getClients', OrderController.getClients);
routes.post("/uploadFile",OrderController.FileUpload,(req,res)=>{
    res.send("file uploaded");
});

routes.post('/login',validateData(loginValidation),AuthController.userLogin);
routes.post('/logout',AuthController.logout);

routes.put('/updateShippingAddress/:orderID',OrderController.updateShippingAddress);

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

routes.get('/getSeasons',GOTController.getSeasons);

module.exports = routes; 
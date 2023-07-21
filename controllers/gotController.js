const User = require('../schemas/users');
const Client = require("../schemas/clients");
const Product = require("../schemas/products");
const Order = require("../schemas/orders");
const UserService = require('../services/user.service');
const multer = require("multer");

module.exports= {
    createUser
}
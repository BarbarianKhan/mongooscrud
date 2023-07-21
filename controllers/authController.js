const User = require('../schemas/users');
const jwt = require("jsonwebtoken");

const userLogin = async (req,res,next)=>{
    let { email, phone } = req.body;
    
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch {
        res.status(404).send(existingUser);
        return next();
    }
    if (!existingUser || existingUser.phone != phone) {
        res.status(404).send({message:"Wrong details please check at once"});
        return next();
    }
    let token;
    try {
        //Creating jwt token
        token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        "aixinvestmentgroup",
        { expiresIn: "2h" }
        );
    } catch (err) {
        res.status(404).send({message:"Error! Something went wrong."});
    }
    
    res.status(200)
        .json({
        success: true,
        data: {
            userId: existingUser.id,
            user: existingUser,
            token: token,
        },
        });
};

const logout = async (req,res,next)=>{
    res.json({ message: 'Logged out successfully' });
};
module.exports = {
    userLogin,
    logout
}
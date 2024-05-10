const User = require('../schemas/users');
const jwt = require("jsonwebtoken");

class AuthController{
    userLogin = async (req,res,next)=>{
    
        let existingUser;
        try {
            existingUser = await User.findOne(req.params).exec();
            console.log(existingUser);
            if(existingUser){
                let token;
                try {
                    //Creating jwt token
                    token = jwt.sign(
                    { userId: existingUser.id, email: existingUser.email },
                    "aixinvestmentgroup",
                    { expiresIn: "2h" }
                    );
                    

                    res.status(200).json({
                                        success: true,
                                        data: {
                                            userId: existingUser.id,
                                            user: existingUser,
                                            token: token,
                                        },
                                    });

                } catch (err) {
                    res.status(404).send({message:err});
                }
            }else{
                res.status(404).send({message:"Wrong details please check at once"});
            }
        } catch(e) {
            res.status(404).send({message:"Wrong details please check at once"});
            return next();
        }
        
    };
    // Logout APi 
    logout = async (req,res,next)=>{
        res.json({ message: 'Logged out successfully' });
    };
}
module.exports = new AuthController();
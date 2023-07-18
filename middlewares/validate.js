const Joi = require('joi');

const validateData = (schema) =>(req,res,next)=>{
    const { error } = schema.validate(req.body, {
        abortEarly: false,
      });
    if(error)
    {
        let errorList = error.details.map((item)=>{
            return {
                    "name":item.path[0],
                    "message": item.message
                };
        });
        return res.status(400).json({error : errorList});
    }
    next();
}; 

module.exports=validateData;
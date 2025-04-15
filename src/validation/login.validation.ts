import Joi from 'joi';



const loginValidation= Joi.object(
    {
       
        email: Joi.string().min(6).max(30).required().email().required(),
        password: Joi.string().min(6).max(50).required(),
      
     
    }
)



export  {loginValidation };
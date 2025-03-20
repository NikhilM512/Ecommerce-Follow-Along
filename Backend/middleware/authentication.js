const jwt=require('jsonwebtoken');
require('dotenv').config();

console.log(process.env.SECRET_KEY)

const authenticate=(req,res,next)=>{
    const token=req.headers?.authorization?.split(" ")[1];
    
    if(token!='null'){
        const decoded=jwt.verify(token,process.env.SECRET_KEY);
         if (decoded){
            const emailID = decoded.email;
            req.body.email = decoded.emailID;
            const userID = decoded.userID;
            console.log(userID,emailID)
            req.body.userID = userID;
            next()
         }else{
            res.send({"message":"Login Please"});
         }
    }else{
        res.send({"message":"Login Please"});
    }
}

module.exports={authenticate}
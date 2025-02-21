const express=require('express');
const { cartModel } = require('../model/cart.model');


let cartRouter=express.Router();


cartRouter.get("/",async(req,res)=>{
    const {userID}=req.body;
    try {
        const cart_products= await cartModel.find({userId:userID}).populate('productId');
        res.send({"message":"Successfully retrived the cart data from database",data:cart_products})
      } catch (error) {
        res.send({"Error-message":error})
      }
});


cartRouter.post("/add-to-cart",async (req,res)=>{

    try{
        const {productId,quantity,userID}=req.body;

        const newCart=new cartModel({
            productId, 
            Quantity:quantity,
            userId:userID
        });

    await newCart.save();
    res.json({"message":"Hurray! Successfully added the cart product on database"});

} catch (error) {
    console.log(error);
    res.send({error});
}

});


module.exports={cartRouter}
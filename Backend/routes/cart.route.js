const express=require('express');
const { cartModel } = require('../model/cart.model');


let cartRouter=express.Router();


cartRouter.get("/",async(req,res)=>{
    const {userID}=req.body;
    try {
        const cart_products= await cartModel.find({userId:userID}).populate('productId');
        res.send({"message":"Successfully retrived the cart data from database",data:cart_products})
      } catch (error) {
        console.log(error)
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


cartRouter.patch("/update/:id", async (req, res) => {
  
    try {
      const { Quantity } = req.body;
      const id = req.params.id;
      const payload = { Quantity };
      let updatedProduct = await cartModel.findByIdAndUpdate(id, payload);
      if (!updatedProduct) {
        return res.status(404).json({ "message": "Product Not Found" });
      }
      res.status(200).json({ "message": "Successfully updated the product", "product": updatedProduct });
    } catch (error) {
      console.log(error)
      res.status(500).json({ "error": error.message });
    }
  });
  


module.exports={cartRouter}
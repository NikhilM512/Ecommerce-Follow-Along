const mongoose=require("mongoose");

const cartSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Types.ObjectId,
        ref:"productCollection",
    },
    Quantity:{
        type:Number,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"usercollection",
    }
});

const cartModel=mongoose.model("cartCollection", cartSchema);

module.exports={cartModel};
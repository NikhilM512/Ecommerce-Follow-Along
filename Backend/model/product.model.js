const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
      productName:{
        type:String,
        required:true
      },
      productDescription:{
        type:String,
        required:true
      },
      productPrice:{
        type:String,
        required:true
      },
      productImage:{
        type:[String],
        required:true,
        default:"https://muselot.in/cdn/shop/products/muselot_s-plaint-shirtformenincharcoalgreycolor.jpg?v=1658089773&width=1445"
      }
});

const productModel=mongoose.model("productCollection", productSchema);

module.exports={productModel};


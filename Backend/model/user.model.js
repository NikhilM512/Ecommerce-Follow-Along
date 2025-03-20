const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8, maxlength: 16 },
    addresses: [
      {
        country: { type: String, default: "India" },
        city: { type: String },
        address1: { type: String },
        address2: { type: String },
        zipCode: { type: Number },
        addressType: { type: String },
      }
    ],
  });

const userModel=mongoose.model("usercollection",userSchema);

module.exports={
    userModel
}



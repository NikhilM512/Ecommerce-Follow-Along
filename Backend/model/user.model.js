const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
});

const userModel=mongoose.model("usercollection",userSchema);

// export {userModel};
module.exports={
    userModel
}



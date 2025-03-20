const express=require('express');
const { userModel } = require('../model/user.model');

let userRouter=express.Router();

userRouter.get('/profile', async (req, res) => {
    
    try {
      let userID=req.body.userID;
      let user=await userModel.findById(userID);
      if(!user){
        res.status(404).json({"message":"User Not found"});
      }
      res.status(200).json({"message":"Successfully fetched the User Data",data:user})
    } catch (error) {
      res.status(500).json({"message":"Something went wrong",error})
    }
  }); 
  
  
  // userRouter.patch('/add-address', async (req, res) => {
  //     try {
  //         const { userID } = req.body;
  //         const payload =req.body;
  //         //  console.log(address,req.body)
  //         const updated_user = await userModel.findByIdAndUpdate(userID,payload);
  //         if (!updated_user) {
  //             return res.status(404).json({ message: 'User not found' });
  //         }

  //         res.json({ message: 'Address updated successfully' });
  
  //     } catch (error) {
  //         console.error(error);
  //         res.status(500).json({ message: 'Server error' });
  //     }
  // });


//   userRouter.patch('/add-address', async (req, res) => {
//     try {
//         const { userID, country,city,address1,address2,zipCode,addressType } = req.body;
//         const payload ={"address":[{country,city,address1,address2,zipCode,addressType}]};
//         console.log(payload)
//         //  console.log(address,req.body)
//         const updated_user = await userModel.findByIdAndUpdate(userID,payload);
//         if (!updated_user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json({ message: 'Address updated successfully' });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


userRouter.patch('/add-address', async (req, res) => {
  try {
      const { userID, country, city, address1, address2, zipCode, addressType } = req.body;
      const payload = { country, city, address1, address2, zipCode, addressType };

      const user=await userModel.findById(userID);

      console.log(user)
      
      const updated_user = await userModel.findByIdAndUpdate(
          userID,
          { addresses: [...user.addresses,payload] } 
         
      );

      if (!updated_user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'Address updated successfully', user: updated_user });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

  module.exports={userRouter}
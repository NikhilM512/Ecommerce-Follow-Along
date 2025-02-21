const express=require('express');
const { userModel } = require('../model/user.model');

let userRouter=express.Router();

userRouter.get('/profile', async (req, res) => {
    const {userID}=req.body;
    try {
      const user = await userModel.findById(userID); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }); 
  
  
  userRouter.post('/address', async (req, res) => {
      try {
          const { address } = req.body; 
          const user = await userModel.findById(userID);
          if (!user) {
              return res.status(404).json({ message: 'User not found' });
          }
  
          user.address = address; // Update user's address
          await user.save();
          res.json({ message: 'Address updated successfully' });
  
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
      }
  });
  
  module.exports={userRouter}
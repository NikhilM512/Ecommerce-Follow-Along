const express=require('express');
const mongoose=require('mongoose');
const multer=require("multer")
const { userModel } = require('./model/user.model');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cors=require("cors");

const {authentication, authenticate}=require('./middleware/authentication')
const { productRouter } = require('./Routes/product.route');
const { cartRouter } = require('./routes/cart.route');
const { userRouter } = require('./routes/user.route');
const cookieParser = require('cookie-parser');
// console.log(authentication,"J")
require('dotenv').config();

const app=express();

app.use(express.json());
app.use(cors())
app.use(cookieParser());

// app.use(authentication)

let connection = mongoose.connect(process.env.mongoURL);


app.get("/",(req,res)=>{
    res.send("Hello")
});

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+"-"+file.originalname)
    }
});

const upload=multer({storage:storage});

app.post("/upload",upload.single("myFile"),(req,res)=>{
    try {
        console.log(req.file);
        res.send({"message":"file uploaded successfully"});
    } catch (error) {
        console.log(error);
        res.send({"err":error})
    }
});

app.post("/signup", async (req, res) => {
    console.log(req.body)
    const {name,email, password} = req.body;
    const userPresent = await userModel.findOne({email}) 
    if(userPresent?.email){
        res.send({"message":"Try loggin in, already exist"})
    }
    else{
        try{
            bcrypt.hash(password, 4, async function(err, hash) {
                const user = new userModel({name,email,password:hash})
                await user.save()
                res.send({"message":"Sign up successfull"})
            });
        }
       catch(err){
            console.log(err)
            res.send({"Error-message":"Something went wrong, pls try again later"})
       }
    }   
});


app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    console.log(email,password)
    try {
        let user= await userModel.find({email});
        console.log(user,"j")
        if(user.length>0){
            let hashed_password=user[0].password;
            bcrypt.compare(password,hashed_password,function(err,result){
                if(result){
                    const token = jwt.sign({"userID":user[0]._id,"email":user[0].email},process.env.SECRET_KEY,{expiresIn: '1h'});
                    res.cookie('jwt', token);
                    res.cookie('authToken', token, {
                        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                        maxAge: 3600000, // 1 hour (in milliseconds, same as expiresIn)
                        secure: process.env.NODE_ENV === 'production', // Send cookie only over HTTPS in production
                        sameSite: 'strict', // Helps prevent CSRF attacks
                      })
                      res.send({"msg":"Login successfull","token" : token});
                    // res.send({"msg":"Login successfull","token" : token})
                }else{
                    res.send({message:"Login failed! Enter the correct password"})
                }
            })
        }else{
            res.send({message:"Login failed! Please register first"})
        }
    } catch (error) {
        res.json({"Message":"Somthing went wrong!",error})
    }
})


app.get('/protected', (req, res) => {
    const token = req.cookies.authToken;
    if(!token){
      return res.status(401).send("Unauthorized");
    }
    try {
      const decoded = jwt.verify(token, 'your-secret-key');
      res.send(`Welcome, ${decoded.email}!`);
    } catch (err) {
      res.status(401).send("Unauthorized");
    }
  });

app.use("/product", productRouter);

// app.use(authenticate);
app.use("/user", authenticate, userRouter);
app.use("/cart", authenticate, cartRouter);


app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
})

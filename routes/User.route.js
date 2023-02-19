const {UserModel}=require("../model/User.model")
const bcrypt = require('bcrypt');
const express=require("express")
var jwt = require('jsonwebtoken');
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,pass,name,age}=req.body
    try {
        bcrypt.hash(pass,5, async(err, secure_password)=> {
            if(err){
                console.log(err)
            }else{
                const user=new UserModel({email,pass:secure_password,name,age})
                await user.save()
                res.send("User register")
            }
        });
  
    } catch (error) {
        res.send(`something wrong ${error.message}`)
    }
   
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body

    try {
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass, user[0].pass, (err, result) =>{
                if(result){
                    // const token=jwt.sign({course:'backend'},'masai');
                    const token=jwt.sign({userID:user[0]._id},'masai');

                    res.send({"mes":"login successfull","token":token})

                }else{
                res.send({"mes":"wrong credintial"})

                }
            })
        }else{
            res.send({"mes":"wrong credintial"})
        } 
    } catch (error) {
        res.send(`something wrong ${error.message}`)
        
    }
 
})

module.exports={userRouter}
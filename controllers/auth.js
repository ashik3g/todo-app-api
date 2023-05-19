const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')  

exports.userLoginController = async (req,res,next) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid Credential"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credential"})
        }
        const payload = {
            _id:user._id,
            name:user.name,
            email:user.email,
            roles:user.roles,
        }
        const token = jwt.sign(payload,'TODO_APP_API_SECRET',{expiresIn:'2h'});
        return res.status(200).json({message:"Login Success!",token})
    }
    catch(e){
        next(e)
    }
}

exports.userRegisterController = async (req,res,next) => {
    const {name,email,password,roles} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:"Invalid Input Data!"});
    }

    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({message:'User already exists!'})
    }
    user = new User({name,email,password,roles});
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    user.password = hash;
    await user.save();
    return res.status(201).json({message:'User Create Successfully!',user});
     
}

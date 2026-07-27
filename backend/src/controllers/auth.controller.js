import { generateTokens } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// create async await function to get email pass anf fullname
export const signup = async (req, res) => {
  //this was fetched through that middleware in index.js
  const { fullName, email, password } = req.body;

  // try catch block to check all conditions

  try {
    // if empty feilds in email, name and pass
    if (!email || !fullName || !password) {
      return res
        .status(400)
        .json({ message: "Feilds empty please put the input " });
    }

    //checking pass lenght
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must me atleast 6 charactors" });
    }
    //checking if email exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists !" });

    // hashing pass by bcrypt

    const salt = await bcrypt.genSalt(10);
    //store hashed pass
    const hassedPassword = await bcrypt.hash(password, salt);

    //declaration of datamodel 
    const NewUser = new User({
      //did not change name and email coz not hashing it
      fullName,
      email,
      password: hassedPassword,
    });



    // New user created in DB
    if (NewUser) {
      // generate jwt here
      generateTokens(NewUser._id, res);
      await NewUser.save();
      res.status(201).json({
        _id: NewUser._id,
        fullName: NewUser.fullName,
        email: NewUser.email,
        PFP: NewUser.PFP,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }

  } catch (error) {
    console.log("ERROR : ", error.message);
  }
};





export const login = async(req, res) => {
    const {email,password} = req.body;
    try{
        //check if user already exists 
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"invalid creds bitch !"})

        }

     const isPasswordCorrect =   await bcrypt.compare(password,user.password)
     if(!isPasswordCorrect){
        return res.status(400).json({message : "Haiyaa you forgot password 😑!"})

     }
     generateTokens(user._id,res)
     res.status(200).json({
        _id:user._id,
        fullName: user.fullName,
        email: user.email,
        PFP: user.PFP,
     })
    }catch(error){
console.log(error.message);
res.status(500).json({
    message: "Internal Server Error"
});
    }


};





export const logout = (req, res) => {

    try{
res.cookie("jwt","",{maxAge:0})
res.status(200).json({message:"Logged out :) wapas mat aana !"})
    }catch(error){
console.log("ERROR : ", error.message);
    }


};

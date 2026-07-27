import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";

//controller to get users on sidebar 
export const getUsersForSidebar = async(req,res)=>{
try {
    const loggedInUserId = req.user._id
    const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("_password");
    res.status(200).json(filteredUsers)

} catch (error) {
    console.error("ERROR in getUsersForSidebar",error.message);
}

};


//controller to fetch messages form user 
export const getMessages = async(req,res)=>{
    try {
//get params or id for sepcific user in chat 
        const {id:userToChatId} = req.params
        const MyId = req.user._id;
        //to find all messages sent and recived from sender and reciver 
        const messages = await Message.find({
            $or:[
                {senderId:MyId,reciverId:userToChatId},
                {senderId:userToChatId,reciverId:MyId}
            ]
        })

        res.status(200).json(messages)

    } catch (error) {
       console.error("ERROR in getting messages ",error.message); 
    }
}

//controller to send messags 

export const sendMessages = async(req,res)=>{
try {
    // grab text and image 
    const {text,image}= req.body;
    //grab reciver id 
    const {id:reciverId} = req.params;

    const senderId = req.user._id;

    let imageUrl;
    if(image){
        //upload image to cloudinary 
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
    }


    const newMessage = new Message({

        senderId,
        reciverId,
        text,
        image:imageUrl,

    })
    await newMessage.save();

//Realtime functionallity goes here > socket io 

res.status(201).json(newMessage)


} catch (error) {
    console.log("Error",error.message)
}

}

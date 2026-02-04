// import validator from 'validator'
// import bcrypt from 'bcrypt'
// import userModel from '../models/userModel.js'
// import jwt from 'jsonwebtoken'
// import {v2 as cloudinary} from 'cloudinary'



// // API to register user
// const registerUser = async (req, res) => {

//     try {
//         const { name, email, password } = req.body

//         if (!name || !password || !email) {
//             return res.json({ success: false, message: "Missing Details" })

//         }
//         //validating email format
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "enter a valid email" })

//         }
//         // validating strong password
//         if (password.length < 8) {
//             return res.json({ success: false, message: "enter a Password" })

//         }

//         // hashing user password
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)

//         const userData = {
//             name, email, password: hashedPassword
//         }

//         const newUser = new userModel(userData)
//         const user = await newUser.save()
//         // _id
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

//         res.json({ success: true,token })


//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// // API for user login
// const loginUser = async (req,res)=>{
//     try {
        
//         const {email,password} =req.body
//         const user = await userModel.findOne({email})

//         if(!user){
//             return res.json({ success: false, message: 'User does not exist' })
 
//         }
//         const isMatch = await bcrypt.compare(password,user.password)

//         if(isMatch){
//             const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
//             res.json({success:true,token})
//         }else{
//             res.json({success : false , message:"Invalid credentials"})
//         }


//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
        
//     }
// }
// // API to get user Profile Data
// const getProfile = async (req,res)=>{
//     try {
//         const { userId } = req  
//         const userData = await userModel.findById(userId).select('-password')
        
//         res.json({success:true,userData})
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }


// //API to update user profile
// const  updateProfile = async (req,res)=>{
//    try {
//       const {userId , name , phone , address , dob , gender } = req.userId

//       const imageFile = req.file 

//       if(!name ||  !phone || !dob || !gender){
//         return res.json({ success:false , message: "Missing Data"})

//       }
//       await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

//       if(imageFile){
//         // upload image to cloudinary
//         const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
//         const imageURL = imageUpload.secure_url
        
//         await userModel.findByIdAndUpdate(userId,{image:imageURL})

//       }

//       res.json({success :true , message :"profile Updated"})
//    } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
    
//    }
// }

// export {registerUser,loginUser,getProfile , updateProfile}


import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import engineerModel from '../models/engineerModel.js'
import meetingModel from '../models/meetingModel.js'
import razorpay from 'razorpay'

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !password || !email) {
      return res.json({ success: false, message: 'Missing Details' })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Enter a valid email' })
    }

    if (password.length < 8) {
      return res.json({ success: false, message: 'Enter a password' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: 'User does not exist' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req
    const userData = await userModel.findById(userId).select('-password')
    res.json({ success: true, userData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body
    const { userId } = req
    const imageFile = req.file

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: 'Missing Data' })
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: address ? JSON.parse(address) : {},
      dob,
      gender,
    })

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image',
      })

      await userModel.findByIdAndUpdate(userId, {
        image: imageUpload.secure_url,
      })
    }

    res.json({ success: true, message: 'Profile Updated' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// API to book meeting

// const bookMeeting = async (req,res)=>{
//   try {
//     const {userId,engId,slotDate,slotTime} = req.body
//     const engData = await engineerModel.findById(engId).select('-password')
//     if(!engData.available){
//       return res.json({success:false,message:'Engineer not available'})
//     }
//     let slots_booked = engData.slots_booked

//     // checking for slot availability
//     if(slots_booked[slotDate]){
//       if(slots_booked[slotDate].includes(slotTime)){
//       return res.json({success:false,message:'slot not available'})
//       } else{
//         slots_booked[slotDate].push(slotTime)
//       }
//     } else {
//       slots_booked[slotDate] = []
//       slots_booked[slotDate].push(slotTime)
//     }
//     const userData = await userModel.findById(userId).select('-password')

//     delete engData.slots_booked

//     const meetingData = {
//          userId,
//          engId,
//          userData,
//          engData,
//          amount : engData.fees,
//          slotTime,
//          slotDate,
//          date : Date.now()
//     }

//     const newMeeting = new meetingModel(meetingData)

//     await newMeeting.save()

//     // save new slots data in engData
//     await engineerModel.findByIdAndUpdate(engId,{slots_booked})

//     res.json({success:true , message:'meeting booked'})

//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
    
//   }
// }
const bookMeeting = async (req, res) => {
  try {
    const { engId, slotDate, slotTime } = req.body
    const userId = req.userId   // ✅ FIXED

    const engData = await engineerModel.findById(engId).select('-password')
    if (!engData || !engData.available) {
      return res.json({ success: false, message: 'Engineer not available' })
    }

    let slots_booked = engData.slots_booked || {}   // ✅ FIXED

    // checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: 'slot not available' })
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = [slotTime]
    }

    const userData = await userModel.findById(userId).select('-password')
    if (!userData) {
      return res.json({ success: false, message: 'User not found' })
    }

    // convert mongoose doc to plain object
    const engDataObj = engData.toObject()
    delete engDataObj.slots_booked   // ✅ SAFE

    const meetingData = {
      userId,
      engId,
      userData: userData.toObject(),
      engData: engDataObj,
      amount: engData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }

    const newMeeting = new meetingModel(meetingData)
    await newMeeting.save()

    // save new slots data in engineer
    await engineerModel.findByIdAndUpdate(engId, { slots_booked })

    res.json({ success: true, message: 'meeting booked' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to get user meetings fro frontend my-meeting page

// const listMeeting = async (req,res) => {
//     try {
      

//       const {userId} = req.body
//       const meetings = await meetingModel.find({userId})

//       res.json({success:true,meetings})

//     } catch (error) {
//       console.log(error)
//     res.json({ success: false, message: error.message })
//     }
// }
const listMeeting = async (req, res) => {
  try {
    const userId = req.userId; // ✅ get from middleware

    const meetings = await meetingModel.find({ userId }).populate('engData');

    res.json({ success: true, meetings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel meetings

// const cancelMeeting = async (req,res)=>{

//   try {
    
//     const {userId , meetingId} = req.body

//     const meetingData = await meetingModel.findById(meetingId)

//     // verify meeting user
//     if(meetingData.userId !== userId){
//       return res.json({success:false,message:'unauthorized action'})
//     }

//     await meetingModel.findByIdAndUpdate(meetingId,{cancelled:true})

//     // releasing engineer slot

//     const {engId ,slotDate ,slotTime} = meetingData

//     const engineerData =await engineerModel.findById(engId)

//     let slots_booked = engineerData.slots_booked

//     slots_booked[slotDate] = slots_booked[slotDate].filter(e => e!== slotTime)

//     await engineerModel.findByIdAndUpdate(engId,{slots_booked})

//     res.json({success:true, message:'meetings cancelled'})

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// }

const cancelMeeting = async (req, res) => {
  try {
    const userId = req.userId;   // 👈 from token
    const { meetingId } = req.body;

    const meetingData = await meetingModel.findById(meetingId);

    if (!meetingData) {
      return res.json({ success: false, message: "Meeting not found" });
    }

    // verify meeting user
    if (meetingData.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await meetingModel.findByIdAndUpdate(meetingId, { cancelled: true });

    // release engineer slot
    const { engId, slotDate, slotTime } = meetingData;

    const engineerData = await engineerModel.findById(engId);

    let slots_booked = engineerData.slots_booked;

    slots_booked[slotDate] =
      slots_booked[slotDate].filter(e => e !== slotTime);

    await engineerModel.findByIdAndUpdate(engId, { slots_booked });

    res.json({ success: true, message: "Meeting cancelled" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// const razorpayInstance = new razorpay({
//   key_id: '',
//   key_secret: ''
// })

// API to make payment of meeting using razorpay

const paymentRazorpay = async (req,res) =>{

}


export { registerUser, loginUser, getProfile, updateProfile , bookMeeting ,listMeeting ,cancelMeeting }

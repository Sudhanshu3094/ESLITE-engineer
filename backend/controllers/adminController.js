import validator from "validator"
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import engineerModel from "../models/engineerModel.js"
import jwt from 'jsonwebtoken'
import meetingModel from "../models/meetingModel.js"
import userModel from "../models/userModel.js"


//. API for adding engineer
const addEngineer = async (req, res) => {

  try {

    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
    const imageFile = req.file

    // console.log({ name,email,password,speciality,degree,experience,about,fees,address},imageFile);
    //checking for all data to add engineers
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: "missing details" })
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "please enter a valid email" })

    }
    //validatting strong password
    if (password.length < 8) {
      return res.json({ success: false, message: " please enter a strong password" })

    }

    // hashing engineer password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
    const imageUrl = imageUpload.secure_url

    //engineer data
    const engineerData = {
      name, email, image: imageUrl, password: hashedPassword, speciality, degree, experience, about, fees, address: JSON.parse(address),
      date: Date.now()
    }

    const newEngineer = new engineerModel(engineerData)
    await newEngineer.save()

    res.json({ success: true, message: "Engineer Added" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API for admin login
const loginAdmin = async (req, res) => {
  try {

    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      res.json({ success: true, token })


    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//API to get all engineer list for admin panel
const allEngineers = async (req, res) => {
  try {

    const engineers = await engineerModel.find({}).select('-password')
    res.json({ success: true, engineers })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

//API to get all meetings List

const meetingsAdmin = async (req, res) => {

  try {
    const meetings = await meetingModel.find({})
    res.json({ success: true, meetings })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// Api for meetings cancelation

const meetingCancel = async (req, res) => {

  try {

    const { meetingId } = req.body

    const meetingData = await meetingModel.findById(meetingId)



    await meetingModel.findByIdAndUpdate(meetingId, { cancelled: true })

    // releasing engineer slot

    const { engId, slotDate, slotTime } = meetingData

    const engineerData = await engineerModel.findById(engId)

    let slots_booked = engineerData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await engineerModel.findByIdAndUpdate(engId, { slots_booked })

    res.json({ success: true, message: 'meetings cancelled' })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// API to get dashboad data for admin panel

const adminDashboard = async (req, res) => {

  try {

    const engineers = await engineerModel.find({})
    const users = await userModel.find({})
    const meetings = await meetingModel.find({})
    
    const dashData ={
      engineers : engineers.length,
      meetings : meetings.length,
      clients : users.length,
      latestMeetings: meetings.reverse().slice(0,5)

    }

    res.json({success:true,dashData})


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


export { addEngineer, loginAdmin, allEngineers, meetingsAdmin, meetingCancel , adminDashboard }
import engineerModel from "../models/engineerModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import meetingModel from "../models/meetingModel.js"

const changeAvailablity = async (req, res) => {
  try {

    const { engId } = req.body
    const engData = await engineerModel.findById(engId)
    await engineerModel.findByIdAndUpdate(engId, { available: !engData.available })
    res.json({ success: true, message: 'Availablity Changed' })



  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

const engineerList = async (req, res) => {
  try {
    const engineers = await engineerModel.find({}).select(['-password', '-email'])

    res.json({ success: true, engineers })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


//API for engineer login

const loginEngineer = async (req, res) => {
  try {

    const { email, password } = req.body
    const engineer = await engineerModel.findOne({ email })

    if (!engineer) {
      return res.json({ success: false, message: 'Invalid Credentials' })
    }

    const isMatch = await bcrypt.compare(password, engineer.password)

    if (isMatch) {

      const token = jwt.sign({ id: engineer._id }, process.env.JWT_SECRET)

      res.json({ success: true, token })

    } else {
      res.json({ success: false, message: 'Invalid Credentials' })

    }



  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// API to get Engineer for Engineer panel

const meetingsEngineer = async (req, res) => {
  try {

    const engId = req.engId
    const meetings = await meetingModel.find({ engId })

    res.json({ success: true, meetings })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }


}

// API  to make meetings completed for engineer panel

const meetingComplete = async (req, res) => {
  try {
    const engId = req.engId
    const { meetingId } = req.body
    const meetingData = await meetingModel.findById(meetingId)

    if (meetingData && meetingData.engId.toString() === engId) {
      await meetingModel.findByIdAndUpdate(meetingId, { isCompleted: true })
      return res.json({ success: true, message: 'Meeting Completed' })
    } else {
      return res.json({ success: false, message: 'Mark failed' })
    }

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// API  to cancel meetings  for engineer panel

const meetingCancel = async (req, res) => {
  try {
    const engId = req.engId
    const { meetingId } = req.body

    const meetingData = await meetingModel.findById(meetingId)

    if (meetingData && meetingData.engId.toString() === engId) {
      await meetingModel.findByIdAndUpdate(meetingId, { cancelled: true })
      return res.json({ success: true, message: 'Meeting Cancelled' })
    } else {
      return res.json({ success: false, message: 'Cancellation failed' })
    }

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// API to get dashboard data for engineer panel


const engineerDashboard = async (req, res) => {
  try {
    const engId = req.engId
    const meetings = await meetingModel.find({ engId })

    let earnings = 0
    meetings.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount
      }
    })

    let clients = []

    meetings.map((item) => {
      const userId = item.userId._id ? item.userId._id : item.userId

      if (!clients.includes(userId.toString())) {
        clients.push(userId.toString())
      }
    })

    const dashData = {
      earnings,
      meetings: meetings.length,
      clients: clients.length,
      latestMeetings: meetings.reverse().slice(0, 5)
    }

    res.json({ success: true, dashData })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}


// const engineerDashboard = async (req, res) => {


//   try {

//     const engId = req.engId

//     const meetings = await meetingModel.find({engId})

//     let earnings = 0 

//     meetings.map((item)=>{
//          if(item.isCompleted || item.payment){
//           earnings += item.amount
//          }
//     })
//     let clients = []

//     meetings.map((item)=>{
//        if(!clients.includes(item.userId)){
//         clients.push(item.userId)
//     }
//   })


//   const dashData = {

//     earnings,
//     meetings : meetings.length,
//     clients : clients.length,
//     latestMeetings: [...meetings].reverse().slice(0,5)
//   }
//   res.json({success : true , dashData})
//   } catch (error) {
//     console.log(error)
//     res.json({ success: false, message: error.message })
//   }
// }


//API to get ENGINEER profile for engineer panel
const engineerProfile = async (req, res) => {

  try {

    const engId = req.engId
    const profileData = await engineerModel.findById(engId).select('-password')

    res.json({ success: true, profileData })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to update engineer profile data from engineer panel
const updateEngineerProfile = async (req, res) => {

  try {
   const engId = req.engId         
    const { fees, address, available } = req.body

    await engineerModel.findByIdAndUpdate(engId, { fees, address, available })

    res.json({ success: true, message: "profile Updated" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}



export {
  changeAvailablity,
  engineerList,
  loginEngineer,
  meetingsEngineer,
  meetingCancel,
  meetingComplete,
  engineerDashboard,
  engineerProfile,
  updateEngineerProfile
}
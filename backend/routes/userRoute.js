// import express from 'express'
// import { registerUser,loginUser, getProfile , updateProfile ,bookMeeting } from '../controllers/userController.js'
// import authUser from '../middlewares/authUser.js'
// import upload from '../middlewares/multer.js'

// const userRouter = express.Router()

// userRouter.post('/register',registerUser)
// userRouter.post('/login',loginUser)

// userRouter.get('/get-profile',authUser,getProfile)
// userRouter.post('/update-profile', upload.single('image'),authUser,updateProfile)
// userRouter.post('/book-meeting',authUser,bookMeeting)




// export default userRouter

import express from 'express'
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookMeeting,
  listMeeting,
  cancelMeeting
} from '../controllers/userController.js'

import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

// Auth
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

// Profile
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post(
  '/update-profile',
  authUser,
  upload.single('image'),
  updateProfile
)

// Meetings
userRouter.post('/book-meeting', authUser, bookMeeting)

userRouter.get('/meetings',authUser,listMeeting)

userRouter.post('/cancel-meeting',authUser,cancelMeeting)

export default userRouter

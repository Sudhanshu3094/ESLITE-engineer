import express from 'express'
import { engineerList , loginEngineer , meetingsEngineer ,meetingComplete , meetingCancel , engineerDashboard , engineerProfile , updateEngineerProfile} from '../controllers/engineerController.js'
import authEngineer from '../middlewares/authEngineer.js'

const engineerRouter = express.Router()

engineerRouter.get('/list',engineerList)
engineerRouter.post('/login',loginEngineer)
engineerRouter.get('/meetings',authEngineer,meetingsEngineer)
engineerRouter.post('/complete-meeting', authEngineer,meetingComplete)
engineerRouter.post('/cancel-meeting', authEngineer,meetingCancel)
engineerRouter.get('/dashboard' , authEngineer,engineerDashboard)
engineerRouter.get('/profile',authEngineer,engineerProfile)
engineerRouter.post('/update-profile',authEngineer,updateEngineerProfile)




export default engineerRouter
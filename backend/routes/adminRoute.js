import express from "express";
import { addEngineer ,allEngineers,loginAdmin , meetingsAdmin ,meetingCancel , adminDashboard} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from "../controllers/engineerController.js";

const adminRouter = express.Router()

adminRouter.post('/add-engineer',authAdmin,upload.single('image'),addEngineer)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-engineers',authAdmin,allEngineers)
adminRouter.post('/change-availability',authAdmin,changeAvailablity)
adminRouter.get('/meetings',authAdmin,meetingsAdmin)
adminRouter.post('/cancel-meeting',authAdmin,meetingCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)


export default adminRouter
// import mongoose from "mongoose";

// const meetingSchema = new mongoose.Schema({
//     userId:{ type : String , required : true },
//     engId :{type : String , required : true} ,
//     slotDate : { type: String ,required :true},
//     slotTime : { type: String ,required :true},
//     userData : { type: Object ,required :true},
//     engData : { type: Object ,required :true},
//     amount : { type: Number ,required :true},
//     date : { type: Number ,required :true},
//     cancelled : { type: Boolean ,default :false},
//     payment : { type: Boolean ,default : false},
//     isCompleted : { type: Boolean ,default :false}

// })

// const meetingModel = mongoose.model.meeting || mongoose.model('meeting', meetingSchema)

// export default meetingModel
import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    engId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'engineer',
      required: true
    },
    slotDate: {
      type: String,
      required: true
    },
    slotTime: {
      type: String,
      required: true
    },
    userData: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    engData: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: Number,
      required: true
    },
    cancelled: {
      type: Boolean,
      default: false
    },
    payment: {
      type: Boolean,
      default: false
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const meetingModel =
  mongoose.models.meeting || mongoose.model('meeting', meetingSchema)

export default meetingModel

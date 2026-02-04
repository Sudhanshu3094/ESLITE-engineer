// import mongoose from "mongoose";


// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     //https://www.base64-image.de/
//     address: { type: Object, default: {line1:'', line2:''} },
//     gender: { type: String, default: "Not Selected"},
//     dob: { type: String, default: "Not Selected"},
//     phone:{type: String, default:'000000000'}


    
// });

// const userModel = mongoose.models.user || mongoose.model('user', userSchema);

// export default userModel;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // https://www.base64-image.de/
    image: { 
        type: String, 
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemSAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA5uSURBVHgB..." 
    },

    address: { 
        type: Object, 
        default: { line1: '', line2: '' } 
    },

    gender: { type: String, default: "Not Selected" },
    dob: { type: String, default: "Not Selected" },
    phone: { type: String, default: '0000000000' }  // corrected length
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;

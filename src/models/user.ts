import { Schema, model, models } from "mongoose";

const userSchema = new Schema( {
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false, 
    },
    fullname: {
        type: String,
        required: [true, "The name is required"],
        minLength: [3, "The name must be at least 3 characters"],
        maxLength: [50, "The name must be no more than 50 characters"],
    }
    
})


const User = models.User || model("User", userSchema);
export default User; 
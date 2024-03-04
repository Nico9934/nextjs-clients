import { Schema, model, models } from "mongoose";


const clientSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name is required"],
        minLength: [3, "The name must be at least 3 characters"],
        maxLength: [50, "The name must be no more than 50 characters"],
    }, 
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },
    phone: {
        type: String,
        required: [true, "Password is required"],
    },
    address: {
        type: String,
        required: [true, "address is required"],  
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    }
})

const Client = models.Client || model("Client", clientSchema)
export default Client;
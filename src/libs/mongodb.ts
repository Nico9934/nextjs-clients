import mongoose from "mongoose";

export const  connectDb =  async () => {
    const db = await mongoose.connect(`${process.env.MONGODB_URI}`);
    const {connection} = db; 
    
    try {
        if(connection.readyState === 1) {
            console.log("Mongo Db Conectado");
            return Promise.resolve(true)
        } 
    } catch (error) {
        console.log(error)
        return Promise.reject(false)
    }
   
    
}


import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async ()=>{
try{
   const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
   console.log(`\n MONGODB Connected !! DB Host:${connectionInstance.connection.host}`)

}

catch(error){
    console.log("MONGODB connection error:", error)
    process.exit(1)
}
}

// const connectDB = () => {
//     return new Promise((resolve, reject) => {
//         mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//             .then(connectionInstance => {
//                 console.log(`\nMONGODB Connected!! DB Host: ${connectionInstance.connection.host}`);
//                 resolve(); // Resolve the promise if connection is successful
//             })
//             .catch(error => {
//                 console.error("MONGODB connection error:", error);
//                 reject(error); // Reject the promise if there's an error
//             });
//     });
// };





export default connectDB



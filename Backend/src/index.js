import {app} from './app.js'
import 'dotenv/config'

import connectDB from "./DB/index.js";



connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`Server is running at: ${process.env.PORT || 8000}`)
})

}) 
.catch((Error)=>{
    console.log("MongoDB connection failed !!", Error)
})

















    // (async () => {
    //     try {
    //         await mongoose.connect(`${process.env.MONGODBURL}`)
    //         app.on("error", () => {
    //             console.error("Error:", error)
    //             throw error
    //         })

    //         app.listen(process.env.PORT, () => {
    //             console.log(`App is listening on port ${process.env.PORT
    //                 }`)



    //         })
    //     }

    //     catch (error) {
    //         console.error("Error:", error)
    //         throw error
    //     }
    // })()
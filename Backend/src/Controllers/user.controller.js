import {asyncHandler} from '../utils/asynHandler.js'


const registerUser = asyncHandler(async ()=>{
    res.status(200).json({
        message: "ok"
    })
})

export {registerUser}
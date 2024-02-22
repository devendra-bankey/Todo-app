import mongoose, {Schema} from "mongoose";
import { User } from "./user.model";

const todolistSchema = new Schema({
    title:{
        type: String,
        maxlength: 121 //Character Lenth
    },
    
    description:{
        text: {
            type: String,
            required: true,
          },
          list: [{
            type: String,
          }],
    },
    

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    Iscompleted:{
        type: Boolean,
        required:true
    }




},{
    timestamps:true // Automatically add createdAt and updatedAt timestamps (if we are using that new keyword)
})












export const Todolist = mongoose.model("Todolist", todolistSchema);

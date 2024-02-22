import mongoose, {Aggregate, Schema, Types} from "mongoose";  // import the Schema object specifically from the "mongoose" module. It's a concise way to extract only the Schema object from the larger mongoose module.
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true, //Mongoose will automatically trim any leading or trailing whitespaces from the values of these fields before storing them in the database.
        lowercase: true
    },
    
    fullName:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        
    },
    
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    password:{
        type: String,
        required: true
        
    },

    avatar: {
        type: String, // cloudinary url
        required: true,
        trim: true,
    },

    coverImage: {
        type: String, // cloudinary url
    },

    todolist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todolist"
    }


},{
    timestamps:true // Automatically add createdAt and updatedAt timestamps (if we are using that new keyword)
})


userSchema.pre("save", async function(next){
    if(!this.isModifed("password")){
        return next()
    }
    this.password = bcrypt.hash(this.password,10)
    next()
        
    })

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
    // jwt.sign(payload, secretOrPrivateKey, [options, callback])

}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}


export const User = mongoose.model("User", userSchema);
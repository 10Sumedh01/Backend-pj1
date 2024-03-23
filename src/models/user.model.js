import mongoose,{Schema} from "mongoose";
import Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        fullName:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar:{
            type: String,//cloudnary urls
            required: true,
        },
        coverImg:{
            type: String,//cloudnary urls
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password:{
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken:{
             type: String,
        }
    },
    {
        timestamps:true
    }
);

userSchema.pre('save', function (next){  // WE can use arrow functions coz it doesn't have current context of userScheme
    if (!this.isModified("password")) return next(); // if there is no change in password then return next()

    this.password = bcrypt.hash(this.password);
    next();
})

//Custom methods 
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User',userSchema)
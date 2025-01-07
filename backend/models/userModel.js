import  mongoose  from 'mongoose';
import  bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userSchema =new mongoose.Schema({
    name:{type:String,  requried:true },
    email:{type:String,  requried:true ,  unique: true ,lowecase:true,trim:true},
    password:{type:String,  requried:true },
    isAdmin:{type:Boolean,  requried:true },
    cartData: {
        type: Object, // Array of cart items
        default:{}, // Default is an empty array
    },
    // dp:{ type :String  }
},{ 
    timestamps: true, 
    minimize:false,
})

// mathod : to compare enterdpassword  and hashed password  by bycript  
userSchema.methods.matchPassword = async function  (enteredPaassword){
    return await bcrypt.compare(enteredPaassword, this.password)
};

// middlewere: for  encript password while it is modifide and hash the updated password for future for validation
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next(); 
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}); 

//generate tokens 
userSchema.methods.generate_access_token= function (){
    return jwt.sign({
        id:this._id,
        name:this.name,
        email:this.email,
        isAdmin:this.isAdmin,
        dp:this.dp
    },
    process.env.JWT_SECRET,
    {
        expiresIn:process.env.JWT_EXPIRY 
    }
)};

userSchema.methods.generate_refresh_token= function (){
    return jwt.sign({
        id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_SECRET_EXP
    }
)};


 const User = mongoose.model('User', userSchema);
 export default User;
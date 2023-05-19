const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    roles:{
        type:[String],
        enum:['USER','ADMIN'],
        default:'USER',
    }
})

const User = model('User',userSchema)
module.exports = User
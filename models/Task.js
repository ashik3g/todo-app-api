const {Schema, model} = require('mongoose')

const taskSchema = new Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String
        },
        status:{
            type:[String],
            required:true,
            enum:['PENDING','COMPLETED'],
            default:'PENDING'
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true,
        }

    },{ timestamps:true }
)

const Task = model('Task',taskSchema)
module.exports = Task;
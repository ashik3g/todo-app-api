const Task = require('../models/Task')

exports.taskAllController = async (req,res,next) => {
    try{
        const tasks = await Task.find();
        return res.status(200).json(tasks);
    }
    catch(e){
        console.log(e);
    }
}

exports.taskUserController = async (req,res,next) => {
    let {id} = req.params;
    try{
        const tasks = await Task.find({user:id});
        return res.status(200).json(tasks);
    }
    catch(e){
        console.log(e);
    }
}

exports.taskCreateController = async (req,res,next) => {
    const {title,description,status} = req.body;
    const user = req.user._id;
    if(!title){
        return res.status(400).json({message:"Title is Required!"});
    }
    try{
        const task = new Task({title,description,status,user})
        await task.save();
        return res.status(201).json({message:'Task Create Successfully!',task})
    }
    catch(e){
        next(e);
    }  
}

exports.taskDetailsController = async (req,res,next) => {
    const { id } = req.params;
    try{
        let singleTask = await Task.findById(id);
        return res.status(200).json({singleTask});
    }
    catch(e){
        console.log(e);
    }
}

exports.taskDeleteController = async (req,res,next) => {
    const { id } = req.params;

    try{
        await Task.findByIdAndDelete(id);
        return res.status(200).json({message:'Task Delete Successfully!'});
    }
    catch(e){
        console.log(e);
    }
}

exports.taskUpdateController = async (req,res,next) => {
    const { id } = req.params;
    const editTask = req.body;

    try{
        await Task.findOneAndUpdate(
            { _id:id },
            { $set:editTask }
        )

        return res.status(200).json({message:'Task Update Successfully!', editTask});
    }
    catch(e){
        console.log(e);
    }
    
}
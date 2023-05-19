const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const routes = require('./routes')

// Users Controller
const userController = require('./controllers/task')
const authController = require('./controllers/auth')
const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(routes)

app.get('/',(req,res)=>{ 
    return res.json({message:'TODO App API'})
})


// create connection
mongoose.connect('mongodb://localhost:27017/todo-app-api')
.then(()=>{
    app.listen(4000,()=>{
        console.log('Application is Running on port 4000')
    })
})
.catch((e)=>{
    console.log(e)
})
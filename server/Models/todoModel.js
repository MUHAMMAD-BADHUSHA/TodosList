const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    todo:{type:String,required:true},
    done:{type:Boolean,default:false}
})

const todoModel = mongoose.model('todo',todoSchema)

module.exports=todoModel
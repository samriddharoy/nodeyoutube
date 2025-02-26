const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    complete:{
        type: Boolean,
        default: false
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subTodos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subTodo' 
    }]
    
});
const mongoose = require('mongoose');

const subTodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  parentTodo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo', // Reference to the main Todo
    required: true,
  },
  createdby:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who created the subTodo
    required: true,
  }
}, { timestamps: true }); // Adds createdAt & updatedAt

const SubTodo = mongoose.model('SubTodo', subTodoSchema);

module.exports = SubTodo;

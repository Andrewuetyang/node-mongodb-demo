import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
  id: Number,
  status: Number,
  content: String,
  time: Number
})

const Todo = mongoose.model('Todo', TodoSchema)

export default Todo
import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
  id: Number,
  status: Number,
  content: String,
  time: {type: Date, default: Date.now}
})

const Todo = mongoose.model('Todo', TodoSchema)

export default Todo
import mongoose from 'mongoose'

const OuthSchema = new mongoose.Schema({
  id: Number,
  user_name: String,
  password: String
})

const Outh = mongoose.model('Outh', OuthSchema)

export default Outh
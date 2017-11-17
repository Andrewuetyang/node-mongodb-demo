import mongoose from 'mongoose'

const IdsSchema = new mongoose.Schema({
  todo_id: Number
})

const Ids = mongoose.model('Ids', IdsSchema)

Ids.findOne((err, data) => {
  if (!data) {
    const newIds = new Ids({
      todo_id: 0
    })
    newIds.save()
  }
})

export default Ids
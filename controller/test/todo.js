import Todo from '../../models/test/todo'
import Ids from '../../models/ids'

class TodoList {
  constructor() {}
  async add (req, res, next) {
    const idData = await Ids.findOne()
    idData.todo_id++
    await idData.save()
    const newTodo = new Todo({
      id: idData.todo_id,
      content: req.body.content,
      time: req.body.time,
      status: 1
    })
    await newTodo.save()
    res.send({
      code: 0,
      message: '保存成功'
    })
  }
}

export default new TodoList()
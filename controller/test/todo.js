import Todo from '../../models/test/todo'
import Ids from '../../models/ids'

class TodoList {
  constructor() {}
  async add (req, res, next) {
    const idData = await Ids.findOne()
    idData.todo_id++
    try {
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
    } catch (err) {
      console.log('新增todo失败', err);
			res.send({
				status: 0,
				message: '新增todo失败'
			})
    }
    
  }
  async delete (req, res, next) {
    const id = req.body.id
    try {
      await Todo.findOneAndRemove({id: id})
      res.send({
        code: 0,
        message: '删除成功'
      })
    } catch (err) {
      console.log('查找删除操作失败', err);
			res.send({
				status: 0,
				message: '查找删除操作失败'
			})
    }
  }
  async update (req, res, next) {
    const {id, status, content, time} = req.body
    let updateObj = {}
    if (status) updateObj.status = status
    if (content) updateObj.content = content
    if (time) updateObj.time = time
    try {
      await Todo.findOneAndUpdate({id: id}, updateObj)
      res.send({
        code: 0,
        message: '更改成功'
      })
    } catch (err) {
      console.log('更改操作失败', err);
			res.send({
				status: 0,
				message: '更改操作失败'
			})
    }
  }
  async list (req, res, next) {
    console.log(111);
    try {
      const list = await Todo.find()
      res.send({
        code: 0,
        data: list
      })
    } catch (err) {
      console.log('todo列表获取失败', err);
			res.send({
				status: 0,
				message: 'todo列表获取失败'
			})
    }
  }
}

export default new TodoList()
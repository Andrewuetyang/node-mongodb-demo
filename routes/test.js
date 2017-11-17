import express from 'express'
import TodoList from '../controller/test/todo'

const router = express.Router()

router.post('/todo/add', TodoList.add)
router.post('/todo/delete', TodoList.delete)
router.post('/todo/update', TodoList.update)
router.get('/todo/list', TodoList.list)

export default router
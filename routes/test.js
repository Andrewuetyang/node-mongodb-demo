import express from 'express'
import todoList from '../controller/test/todo'

const router = express.Router()

router.post('/todo/add', todoList.add)
router.post('/todo/delete', todoList.delete)
router.post('/todo/update', todoList.update)
router.get('/todo/list', todoList.list)

export default router
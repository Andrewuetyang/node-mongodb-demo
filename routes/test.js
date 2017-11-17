import express from 'express'
import TodoList from '../controller/test/todo'

const router = express.Router()

router.post('/todo/add', TodoList.add)

export default router
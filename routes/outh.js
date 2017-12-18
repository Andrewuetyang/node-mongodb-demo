import express from 'express'
import outh from '../controller/outh/index'

const router = express.Router()

router.post('/signin', outh.signin)
router.post('/signup', outh.signup)

export default router
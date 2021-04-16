import {Router} from 'express'
const router = Router()

// Controllers
import { getAllPost } from '../../../controllers/postController/post'

router.get('/getallpost', getAllPost)

export default router
import { Router } from 'express'
const router = Router()

// Auth
import { authJWT } from '../../../auth/auth'

// Controllers 
import { deletePost } from '../../../controllers/postController/post'

router.delete('/deletepost/:postID', authJWT, deletePost )

export default router
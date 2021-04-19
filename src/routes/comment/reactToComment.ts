import {Router} from 'express'

// Auth
import { authJWT } from '../../auth/auth'
import { reactToComment } from '../../controllers/postController/post'

const router = Router()

router.patch('/reacttocomment/:commentID', authJWT, reactToComment)

export default router
import {Router} from 'express'

const router = Router()

router.get('/', (req, res, next) => {
    res.json({
        msg: 'Welcome to UnknownLorem API'
    })
})

export default router
const router = require('express').Router();
const meRouter = require('./me');
const googleRouter = require('./google')
const facebookRouter = require('./facebook')

router.use('/me', meRouter)
router.use('/google', googleRouter)
router.use('/facebook',facebookRouter)

module.exports=router
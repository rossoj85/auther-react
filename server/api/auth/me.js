const router = require('express').Router();
const {User} = require('../../db/models');
const HttpError = require('../../utils/HttpError');

router.put('/', (req, res, next)=>{
    const {email, password} = req.body
    User.findOne({
        where: {email, password}
    })
    .then(user=>{
        if(user){
            req.session.userId = user.id
            res.json(user)  //we need some kind of respondse
        }
        else{
            throw new HttpError(401)
        }
    })
    .catch(next)
})
 
module.exports= router
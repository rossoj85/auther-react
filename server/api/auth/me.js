const router = require('express').Router();
const {User} = require('../../db/models');
const HttpError = require('../../utils/HttpError');
const hour = 360000;

router.get ('/',(req,res,next)=>{
    console.log('@#$!$@!#$@!#INSIDE ME.js GET ROUTE')
    //so that login will recognise the passport data that is now stored on seesion
    res.json(req.user) //this is a passport method
    // User.findById(req.session.userId)
    // .then(res.json.bind(res))
    // .catch(next)
})

router.put('/', (req, res, next)=>{
    const {email, password} = req.body
    User.findOne({
        where: {email, password}
    })
    .then(user=>{
        if(user){
            // req.session.userId = user.id
            req.logIn(user,err=>{
                if(err) return next(err)
                res.json(user)
            })
            req.session.cookie.expires = new Date(Date.now()+ hour)
           
            // res.json(user)  //we need some kind of respondse
        }
        else{
            throw new HttpError(401)
        }
    })
    .catch(next)
})

router.delete('/',(req,res,next)=>{
    req.logout()
    res.sendStatus(204)
    // console.log('SESSION BEFORE DESTROY', req.session)
    // req.session.destroy()
    // // we can also use:
    // // delete req.session.userId
    // console.log('SESSION AFTER DESTROY', req.session)
 
})
 
module.exports= router
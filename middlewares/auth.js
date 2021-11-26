const jwt = require('jsonwebtoken')


        //check if a token is valid or not
const auth = (req,res,next)=>{
    try {
        const token = req.header("Authorization")
        if (!token)
            return res.status(401).json({msg: "UNTHORIZED OPERATION !"})
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(401).json({msg: "UNTHORIZED OPERATION !"})
            req.user = user
            next()
        })
    
    } catch (err) {
        res.status(401).json({msg:err.message})
    }
}


module.exports={auth}